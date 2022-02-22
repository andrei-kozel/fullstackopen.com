require('dotenv').config()
const {
  ApolloServer,
  gql,
  AuthenticationError,
  UserInputError
} = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const DB_URL = process.env.DB_URL
const JWT_SECRET = process.env.JWT_SECRET

console.log('Connecting to BD: ', DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('Connected to BD')
  })
  .catch((err) => {
    console.log('Error connecting to BD: ', err)
  })

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type User {
    id: ID!
    username: String!
    favoriteGenre: String!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String]
  }

  type Author {
    name: String!
    id: ID!
    bookCount: Int!
    born: Int
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book
    editAuthor(name: String!, born: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author')

      if (args.author) {
        const byAuthor = (book) => book.author.name === args.author
        return books.filter(byAuthor)
      }

      if (args.genre) {
        const byGenre = (book) => book.genres.includes(args.genre)
        return books.filter(byGenre)
      }

      return books
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root.id })
      return books.filter((book) => book.author !== root.name).length
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      let author = await Author.findOne({ name: args.author })
      let addedBook = null

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      if (args.author.length < 3) {
        throw new UserInputError(
          'author name must be at least 3 characters long'
        )
      }

      if (args.title.length < 3) {
        throw new UserInputError('title must be at least 3 characters long')
      }

      if (args.published < 0) {
        throw new UserInputError('published date is reqired')
      }

      if (!author) {
        author = await new Author({ name: args.author })
        author = await author.save()
        const book = new Book({ ...args, author: author.id })
        await book.save()
        addedBook = await Book.findOne({ title: args.title }).populate('author')
      } else {
        const book = new Book({ ...args, author: author.id })
        await book.save()
        addedBook = await Book.findOne({ title: args.title }).populate('author')
      }
      return addedBook
    },
    editAuthor: async (root, args, { currentUser }) => {
      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return null
      }

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      await Author.findOneAndUpdate(
        { name: args.name },
        { ...args, born: args.born },
        { new: true }
      )

      return await Author.findOne({ name: args.name })
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id).populate(
        'friends'
      )
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
