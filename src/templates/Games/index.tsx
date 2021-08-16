import GameCard, { GameCardProps } from 'components/GameCard'
import ExploreSidebar, { ItemProps } from 'components/ExploreSidebar'

import React from 'react'
import Base from 'templates/Base'
import * as S from './styles'
import { Grid } from 'components/Grid'
import { KeyboardArrowDown as ArrowDown } from '@styled-icons/material-outlined/KeyboardArrowDown'
import { useQuery } from '@apollo/client'
import { GetGames, GetGamesVariables } from 'graphql/generated/GetGames'
import { GET_GAMES } from 'graphql/queries/games'
import Loader from 'react-loader-spinner'

export type GamesTemplateProps = {
  games?: GameCardProps[]
  filterItems: ItemProps[]
}

const Games = ({ filterItems, games = [] }: GamesTemplateProps) => {
  const { data, loading } = useQuery<GetGames, GetGamesVariables>(GET_GAMES, {
    variables: { limit: 15 }
  })

  const handleFilter = () => {
    return
  }

  const handleShowMore = () => {
    return
  }

  return (
    <Base>
      <S.Main>
        <ExploreSidebar items={filterItems} onFilter={handleFilter} />

        {loading ? (
          <S.Loader>
            <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
          </S.Loader>
        ) : (
          <section>
            <Grid>
              {data?.games.map((game, index) => (
                <>
                  <GameCard
                    key={`${game.slug}`}
                    title={game.name}
                    slug={game.slug}
                    developer={game.developers[0].name}
                    img={
                      game.cover
                        ? `http://localhost:1337${game.cover.url}`
                        : '/img/games/kingdom-Hearts-3-1.png'
                    }
                    price={game.price}
                  />
                </>
              ))}
            </Grid>

            <S.ShowMore role="button" onClick={handleShowMore}>
              <p>Show More</p>
              <ArrowDown size={35} />
            </S.ShowMore>
          </section>
        )}
      </S.Main>
    </Base>
  )
}

export default Games
