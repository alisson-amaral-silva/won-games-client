import { gql, QueryHookOptions, useQuery } from '@apollo/client'
import { GameFragment } from 'graphql/fragments/game'
import {
  GetWishlist,
  GetWishlistVariables
} from 'graphql/generated/GetWishlist'

export const GET_WISHLIST = gql`
  query GetWishlist($identifier: String!) {
    wishlists(where: { user: { email: $identifier } }) {
      id
      games {
        ...GameFragment
      }
    }
  }

  ${GameFragment}
`

export function useGetWishlist(
  options?: QueryHookOptions<GetWishlist, GetWishlistVariables>
) {
  //cria um hook customizado para recuperar os dados da wishlist
  //(GET_WISHLIST é a query msm do grahpql e as options são os parametros mesmo)
  return useQuery<GetWishlist, GetWishlistVariables>(GET_WISHLIST, options)
}
