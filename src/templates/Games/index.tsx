import { KeyboardArrowDown as ArrowDown } from '@styled-icons/material-outlined/KeyboardArrowDown'
import Empty from 'components/Empty'
import ExploreSidebar, { ItemProps } from 'components/ExploreSidebar'
import GameCard, { GameCardProps } from 'components/GameCard'
import { Grid } from 'components/Grid'
import { useQueryGames } from 'graphql/queries/games'
import { useRouter } from 'next/router'
import { ParsedUrlQueryInput } from 'querystring'
import React from 'react'
import Loader from 'react-loader-spinner'
import Base from 'templates/Base'
import { parseQueryStringToFilter, parseQueryStringToWhere } from 'utils/filter'
import * as S from './styles'

export type GamesTemplateProps = {
  games?: GameCardProps[]
  filterItems: ItemProps[]
}

const Games = ({ filterItems }: GamesTemplateProps) => {
  const { push, query } = useRouter()

  const { data, loading, fetchMore } = useQueryGames({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 15,
      where: parseQueryStringToWhere({ queryString: query, filterItems }),
      sort: query.sort as string | null
    }
  })

  const handleFilter = (items: ParsedUrlQueryInput) => {
    push({
      pathname: '/games',
      query: items
    })
    return
  }

  const handleShowMore = () => {
    return fetchMore({ variables: { limit: 15, start: data?.games.length } })
  }

  return (
    <Base>
      <S.Main>
        <ExploreSidebar
          initialValues={parseQueryStringToFilter({
            queryString: query,
            filterItems
          })}
          items={filterItems}
          onFilter={handleFilter}
        />
        <section>
          {data?.games.length ? (
            <>
              <Grid>
                {data?.games.map((game) => (
                  <>
                    <GameCard
                      key={`${game.slug}`}
                      title={game.name}
                      slug={game.slug}
                      developer={game.developers[0].name}
                      img={`http://localhost:1337${game.cover!.url}`}
                      price={game.price}
                    />
                  </>
                ))}
              </Grid>
              {loading ? (
                <S.Loader>
                  <Loader
                    type="ThreeDots"
                    color="#ffffff"
                    height={80}
                    width={80}
                  />
                </S.Loader>
              ) : (
                <S.ShowMore role="button" onClick={handleShowMore}>
                  <p>Show More</p>
                  <ArrowDown size={35} />
                </S.ShowMore>
              )}
            </>
          ) : (
            <Empty
              title=":("
              description="We didn't find any games with this filter"
            />
          )}
        </section>
      </S.Main>
    </Base>
  )
}

export default Games
