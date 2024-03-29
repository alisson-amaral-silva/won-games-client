import CartButton from 'components/CartButton'
import WishlistButton from 'components/WishlistButton'
import Link from 'next/link'
import formatPrice from 'utils/format-price'
import Ribbon, { RibbonColors, RibbonSize } from '../Ribbon'
import Image from 'next/image'
import * as S from './styles'

export type GameCardProps = {
  id: string
  slug: string
  title: string
  developer: string
  img: string
  price: number
  promotionalPrice?: number
  onFav?: () => void
  ribbon?: React.ReactNode
  ribbonColor?: RibbonColors
  ribbonSize?: RibbonSize
}

const GameCard = ({
  id,
  slug,
  developer,
  title,
  img,
  price,
  promotionalPrice,
  ribbon,
  ribbonColor = 'primary',
  ribbonSize = 'normal'
}: GameCardProps) => (
  <S.Wrapper data-cy="game-card">
    {!!ribbon && (
      <Ribbon color={ribbonColor} size={ribbonSize}>
        {ribbon}
      </Ribbon>
    )}
    <Link href={`game/${slug}`} passHref>
      <S.ImageBox>
        <Image src={img} alt={title} layout="fill" />
      </S.ImageBox>
    </Link>
    <S.Content>
      <Link href={`game/${slug}`} passHref>
        <S.Info>
          <S.Title>{title}</S.Title>
          <S.Developer>{developer}</S.Developer>
        </S.Info>
      </Link>
      <S.FavButton>
        <WishlistButton id={id} />
      </S.FavButton>
      <S.BuyBox>
        {!!promotionalPrice && (
          <S.Price isPromotional>{formatPrice(price)}</S.Price>
        )}
        <S.Price data-testid="price">
          {formatPrice(promotionalPrice || price)}
        </S.Price>
        <CartButton id={id} />
      </S.BuyBox>
    </S.Content>
  </S.Wrapper>
)

export default GameCard
