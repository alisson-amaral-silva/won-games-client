import inputsMock from 'components/ExploreSidebar/mock'
import { GetGames, GetGamesVariables } from 'graphql/generated/GetGames'
import { GET_GAMES } from 'graphql/queries/games'
import Games, { GamesTemplateProps } from 'templates/Games'
import { initializeApollo } from 'utils/apollo'

export default function GamesPage(props: GamesTemplateProps) {
  return <Games {...props} />
}

// Cada vez que o usuario add ou remove as coisas ela não é estatica => serverSideProps
// não muda muito => static
export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query<GetGames, GetGamesVariables>({
    query: GET_GAMES,
    variables: { limit: 15 }
  })

  return {
    props: {
      revalidate: 60, // segura os dados por 60 segundos na tela por todas as req e dps de 60 sec da refresh na pagina com novos dados
      initializeApolloState: apolloClient.cache.extract(), // como ja peguei os dados de games acima, isso vai extrair os dados via cache e mandar para o client side
      filterItems: inputsMock
    }
  }
}
