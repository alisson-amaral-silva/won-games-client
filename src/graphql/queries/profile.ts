import { gql } from '@apollo/client'

export const GET_PROFILE = gql`
  query GetProfile($identifier: ID!) {
    user(id: $identifier) {
      id
      email
      username
    }
  }
`
