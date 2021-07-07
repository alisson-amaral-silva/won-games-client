import { GameCardProps } from 'components/GameCard'
import * as S from './styles'

export type GamesTemplateProps = {
  games?: GameCardProps[]
}

const Games = ({ games }: GamesTemplateProps) => (
  <S.Wrapper>
    <h1>Games</h1>
  </S.Wrapper>
)

export default Games
