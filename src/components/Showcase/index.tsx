import { Container } from 'components/Container'
import { GameCardProps } from 'components/GameCard'
import GameCardSlider from 'components/GameCardSlider'
import Heading from 'components/Heading'
import Highlight, { HighlightProps } from 'components/Highlight'
import * as S from './styles'
export type ShowcaseProps = {
  title?: string
  highlight?: HighlightProps
  games?: GameCardProps[]
  color?: 'black' | 'white'
}

const Showcase = ({
  title,
  highlight,
  games,
  color = 'white'
}: ShowcaseProps) => (
  <Container data-cy={title || 'showcase'}>
    <S.SectionMostPopular>
      {!!title && (
        <Heading lineLeft lineColor="secondary">
          {title}
        </Heading>
      )}
      {!!highlight && <Highlight {...highlight} />}
      {!!games && <GameCardSlider items={games} color={color} />}
    </S.SectionMostPopular>
  </Container>
)

export default Showcase
