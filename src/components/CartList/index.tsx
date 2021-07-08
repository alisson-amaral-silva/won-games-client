import * as S from './styles'
import GameItem, { GameItemProps } from '../GameItem'
import Link from 'next/link'
import Button from 'components/Button'

export type CartListProps = {
  items: GameItemProps[]
  total: string
  hasButton?: boolean
}

const CartList = ({ items, total, hasButton = false }: CartListProps) => (
  <S.Wrapper>
    {items.map((item) => (
      <GameItem key={item.title} {...item} />
    ))}
    <S.Footer>
      {!hasButton && <span>Total:</span>}
      Total <S.Total>{total}</S.Total>
      {hasButton && (
        <Link href="/cart" passHref>
          <Button as="a">Buy it now</Button>
        </Link>
      )}
    </S.Footer>
  </S.Wrapper>
)

export default CartList
