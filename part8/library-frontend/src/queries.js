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
      author {
        name
      }
      published
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      published
      genres
      author {
        name
      }
    }
  }
`

export const EDIT_BIRTHDAY = gql`
  mutation editBirthday($born: Int!, $name: String!) {
    editAuthor(name: $name, born: $born) {
      name
      born
    }
  }
`
