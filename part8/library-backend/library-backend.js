require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

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
    allAuthors: async () => await Author.find({})
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root.id })
      return books.filter((book) => book.author !== root.name).length
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      let addedBook = null

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
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return null
      }

      await Author.findOneAndUpdate(
        { name: args.name },
        { ...args, born: args.born },
        { new: true }
      )

      return await Author.findOne({ name: args.name })
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
