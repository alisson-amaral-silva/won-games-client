import { gql } from '@apollo/client'

export const GET_PROFILE = gql`
  query GetProfile {
    me {
      username
      email
    }
  }
`
