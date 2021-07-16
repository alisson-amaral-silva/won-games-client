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

  const { data } = await apolloClient.query<GetGames, GetGamesVariables>({
    query: GET_GAMES,
    variables: { limit: 9 }
  })

  return {
    props: {
      revalidate: 60, // segura os dados por 60 segundos na tela por todas as req e dps de 60 sec da refresh na pagina com novos dados
      games: data.games.map((game) => ({
        title: game.name,
        slug: game.slug,
        developer: game.developers[0].name,
        img: game.cover
          ? `http://localhost:1337${game.cover.url}`
          : '/img/games/kingdom-Hearts-3-1.png',
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(game.price)
      })),
      filterItems: inputsMock
    }
  }
}
