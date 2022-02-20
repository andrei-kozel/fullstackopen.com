import { gql } from '@apollo/client'

export const GET_AUTHORS = gql`
  query getAllAuthors {
    allAuthors {
      bookCount
      born
      name
    }
  }
`

export const GET_BOOKS = gql`
  query getAllBooks {
    allBooks {
      title
      author
      published
    }
  }
`

export const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`
