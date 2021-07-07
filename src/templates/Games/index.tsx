import GameCard, { GameCardProps } from 'components/GameCard'
import ExploreSidebar, { ItemProps } from 'components/ExploreSidebar'

import React from 'react'
import Base from 'templates/Base'
import * as S from './styles'
import { Grid } from 'components/Grid'
import { KeyboardArrowDown as ArrowDown } from '@styled-icons/material-outlined/KeyboardArrowDown'

export type GamesTemplateProps = {
  games?: GameCardProps[]
  filterItems: ItemProps[]
}

const Games = ({ games, filterItems }: GamesTemplateProps) => (
  <Base>
    <h1>Explore games</h1>
    <S.Main></S.Main>
    <ExploreSidebar
      items={filterItems}
      onFilter={() => console.log('Shazam')}
    />
    <section>
      <Grid>
        {games?.map((item, index) => (
          <GameCard key={`${item.title}-${index}`} {...item} />
        ))}
      </Grid>
    </section>
    <S.ShowMore role="button" onClick={() => console.log('show more')}>
      <p>Show More</p>
      <ArrowDown size={35} />
    </S.ShowMore>
  </Base>
)

export default Games
