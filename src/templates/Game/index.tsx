import GameInfo, { GameInfoProps } from 'components/GameInfo'
import Base from 'templates/Base'
import Gallery, { GalleryImageProps } from 'components/Gallery'
import TextContent from 'components/TextContext'
import * as S from './styles'
import GameDetails, { GameDetailsProps } from 'components/GameDetails'

export type GameTemplateProps = {
  cover: string
  gameInfo: GameInfoProps
  gallery?: GalleryImageProps[]
  description: string
  details: GameDetailsProps
}

const Game = ({
  cover,
  gameInfo,
  gallery,
  description,
  details
}: GameTemplateProps) => (
  <Base>
    <S.Cover src={cover} role="image" aria-label="cover"></S.Cover>
    <S.Main>
      <S.SectionGameInfo>
        <GameInfo {...gameInfo} />
        <h1>Game</h1>
      </S.SectionGameInfo>

      <S.SectionGallery>
        {!!gallery && <Gallery items={gallery} />}
      </S.SectionGallery>

      <S.SectionDescription>
        <TextContent title="Description" content={description}></TextContent>
      </S.SectionDescription>

      <S.SectionGameDetails>
        <GameDetails {...details} />
      </S.SectionGameDetails>
    </S.Main>
  </Base>
)

export default Game
