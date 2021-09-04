import FormProfile, { FormProfileProps } from 'components/FormProfile'
import { GetProfile } from 'graphql/generated/GetProfile'
import { GET_PROFILE } from 'graphql/queries/profile'
import { GetServerSidePropsContext } from 'next'
import Profile from 'templates/Profile'
import { initializeApollo } from 'utils/apollo'
import protectedRoutes from 'utils/protected-routes'

export default function Me(props: FormProfileProps) {
  return (
    <Profile>
      <FormProfile username={props.username} email={props.email} />
    </Profile>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)
  const apolloClient = initializeApollo(null, session)

  const { data } = await apolloClient.query<GetProfile>({
    query: GET_PROFILE
  })

  return {
    props: { session, username: data.me?.username, email: data.me?.email }
  }
}
