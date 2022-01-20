import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const ADD_USER = gql`
  mutation addUser ($username: String!, $password: String!,$email: String!) {
    addUser(username: $username, $password: password, $email: email) {
        user
        {
            _id
            username
            email
            bookcount
            saveBooks {
                authors
                bookId
                image
                link
                title
                description
            }
        }
        token
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook ($input: savedBook!) {
    saveBook(input: $input) {
        {
            _id
            username
            email
            bookcount
            saveBooks {
                # _id
                bookId
                authors
                image
                link
                title
                description
            }
        }
        
    }
  }
`;
export const REMOVE_BOOK = gql`
  mutation removeBook ($input: savedBook!) {
    removeBook(input: $input) {
        {
            _id
            username
            email
            bookcount
            saveBooks {
                # _id
                bookId
                authors
                image
                link
                title
                description
            }
        }
        
    }
  }
  `;