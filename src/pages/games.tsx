import Games, { GamesTemplateProps } from 'templates/Games'
import inputsMock from 'components/ExploreSidebar/mock'
import { initializeApollo } from 'utils/apollo'
import { gql } from '@apollo/client'

export default function GamesPage(props: GamesTemplateProps) {
  return <Games {...props} />
}

// Cada vez que o usuario add ou remove as coisas ela não é estatica => serverSideProps
// não muda muito => static
export async function getStaticProps() {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query({
    query: gql`
      query GetGames {
        games {
          name
          slug
          cover {
            url
          }
          developers {
            name
          }
          price
        }
      }
    `
  })

  return {
    props: {
      revalidate: 60, // segura os dados por 60 segundos na tela por todas as req e dps de 60 sec da refresh na pagina com novos dados
      games: data.games.map((game) => ({
        title: game.name,
        developer: game.developers[0].name,
        img: `http://localhost:1337${game.cover.url}`,
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(game.price)
      })),
      filterItems: inputsMock
    }
  }
}
