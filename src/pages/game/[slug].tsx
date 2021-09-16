import {
  GetGameBySlug,
  GetGameBySlugVariables
} from 'graphql/generated/GetGameBySlug'
import { GetGames, GetGamesVariables } from 'graphql/generated/GetGames'
import { GetRecommended } from 'graphql/generated/GetRecommended'
import {
  GetUpcoming,
  GetUpcomingVariables
} from 'graphql/generated/GetUpcoming'
import { GET_GAMES, GET_GAME_BY_SLUG } from 'graphql/queries/games'
import { GET_RECOMMENDED } from 'graphql/queries/recommended'
import { GET_UPCOMING } from 'graphql/queries/upcoming'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Game, { GameTemplateProps } from 'templates/Game'
import { initializeApollo } from 'utils/apollo'
import { getImageUrl } from 'utils/getImageUrl'
import { gamesMapper, highlightMapper } from 'utils/mappers'

const apolloClient = initializeApollo()

export default function Index(props: GameTemplateProps) {
  const router = useRouter()

  //  se a rota não estiver gerada ainda
  // pode mostrar um loading
  // uma tela esqueleto
  if (router.isFallback) return null

  return <Game {...props} />
}

//gera path em build time (/game/bla /game/foo)
export async function getStaticPaths() {
  const { data } = await apolloClient.query<GetGames, GetGamesVariables>({
    query: GET_GAMES,
    variables: { limit: 9 }
  })

  const paths = data.games.map(({ slug }) => ({
    params: { slug }
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await apolloClient.query<
    GetGameBySlug,
    GetGameBySlugVariables
  >({
    query: GET_GAME_BY_SLUG,
    variables: { slug: `${params?.slug}` },
    fetchPolicy: 'no-cache'
  })

  if (!data.games.length) {
    return { notFound: true }
  }

  const game = data.games[0]

  const { data: recommended } = await apolloClient.query<GetRecommended>({
    query: GET_RECOMMENDED
  })

  // get upcmoming games and highlight
  const TODAY = new Date().toISOString().slice(0, 10)
  const { data: upcoming } = await apolloClient.query<
    GetUpcoming,
    GetUpcomingVariables
  >({
    query: GET_UPCOMING,
    variables: { date: TODAY }
  })

  return {
    revalidate: 60,
    props: {
      cover: `${getImageUrl(game.cover?.src)}`,
      gameInfo: {
        id: game.id,
        title: game.name,
        price: game.price,
        description: game.short_description
      },
      gallery: game.gallery.map((image) => ({
        src: `${getImageUrl(image.src)}`
      })),
      description: game.description,
      details: {
        developer: game.developers[0].name,
        releaseDate: game.release_date,
        platforms: game.platforms.map((platform) => platform.name),
        publisher: game.publisher?.name,
        rating: game.rating,
        genres: game.categories.map((category) => category.name)
      },
      upcommingGames: gamesMapper(upcoming.upcommingMoreGames),
      upcommingHighlight: highlightMapper(
        upcoming.showcase?.upcomingGames?.highlight
      ),
      recommendedGames: gamesMapper(recommended.recommended?.section?.games)
    }
  }
}
