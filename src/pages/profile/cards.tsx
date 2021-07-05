import CardsList, { CardsListProps } from 'components/CardsList'
import Profile from 'templates/Profile'
import cardsMock from 'components/PaymentOptions/mock'

export default function Cards({ cards }: CardsListProps) {
  return (
    <Profile>
      <CardsList cards={cards} />
    </Profile>
  )
}

// Cada vez que o usuario add ou remove as coisas ela não é estatica por isso o serverSideProps
export async function getServerSideProps() {
  return {
    props: {
      cards: cardsMock
    }
  }
}
