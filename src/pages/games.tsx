import Games, { GamesTemplateProps } from 'templates/Games'
import gamesMock from 'components/GameCardSlider/mock'

export default function GamesPage(props: GamesTemplateProps) {
  return <Games {...props} />
}

// Cada vez que o usuario add ou remove as coisas ela não é estatica por isso o serverSideProps
export async function getServerSideProps() {
  return {
    props: {
      games: gamesMock
    }
  }
}
