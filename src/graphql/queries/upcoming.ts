import { gql } from '@apollo/client'
import { GameFragment } from 'graphql/fragments/game'
import { HighlightFragment } from 'graphql/fragments/highlight'

export const GET_UPCOMING = gql`
  query GetUpcoming($date: Date!) {
    upcommingMoreGames: games(
      where: { release_date_gt: $date }
      sort: "release_date:desc"
      limit: 8
    ) {
      ...GameFragment
    }

    showcase: home {
      upcomingGames {
        title
        highlight {
          ...HighlightFragment
        }
      }
    }
  }

  ${HighlightFragment}
  ${GameFragment}
`
