import { GetGames, GetGamesVariables } from 'graphql/generated/GetGames'
import { GET_GAMES } from 'graphql/queries/games'
import { GetServerSidePropsContext } from 'next'
import Games, { GamesTemplateProps } from 'templates/Games'
import { initializeApollo } from 'utils/apollo'
import { parseQueryStringToWhere } from 'utils/filter'

import {
  priceFields,
  platformFields,
  sortByPriceFields,
  categoriesFields
} from 'utils/filter/fields'

export default function GamesPage(props: GamesTemplateProps) {
  return <Games {...props} />
}

// Cada vez que o usuario add ou remove as coisas ela não é estatica => serverSideProps
// não muda muito => static
export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const apolloClient = initializeApollo()

  const filterPrice = {
    title: 'Price',
    name: 'price_lte',
    type: 'radio',
    fields: priceFields
  }

  const filterPlatforms = {
    title: 'Platforms',
    name: 'platforms',
    type: 'checkbox',
    fields: platformFields
  }

  const filterSort = {
    title: 'Sort by price',
    name: 'sort',
    type: 'radio',
    fields: sortByPriceFields
  }

  const filterCategories = {
    title: 'Genres',
    name: 'categories',
    type: 'checkbox',
    fields: categoriesFields
  }

  const filterItems = [
    filterSort,
    filterPrice,
    filterPlatforms,
    filterCategories
  ]

  await apolloClient.query<GetGames, GetGamesVariables>({
    query: GET_GAMES,
    variables: {
      limit: 15,
      where: parseQueryStringToWhere({ queryString: query, filterItems }),
      sort: query.srt as string | null
    }
  })

  return {
    props: {
      initializeApolloState: apolloClient.cache.extract(), // como ja peguei os dados de games acima, isso vai extrair os dados via cache e mandar para o client side
      filterItems: filterItems
    }
  }
}
