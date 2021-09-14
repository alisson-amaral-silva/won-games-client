import OrdersList, { OrdersListProps } from 'components/OrdersList'
import { GetOrders, GetOrdersVariables } from 'graphql/generated/GetOrders'
import { GET_ORDERS } from 'graphql/queries/order'
import { GetServerSidePropsContext } from 'next'
import React from 'react'
import Profile from 'templates/Profile'
import { initializeApollo } from 'utils/apollo'
import { ordersMapper } from 'utils/mappers'
import protectedRoutes from 'utils/protected-routes'

export default function Cards({ items }: OrdersListProps) {
  return (
    <Profile>
      <OrdersList items={items} />
    </Profile>
  )
}

// Cada vez que o usuario add ou remove as coisas ela não é estatica por isso o serverSideProps
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)

  const apolloClient = initializeApollo(null, session)

  const { data } = await apolloClient.query<GetOrders, GetOrdersVariables>({
    query: GET_ORDERS,
    variables: {
      identifier: session?.id
    }
  })

  return {
    props: {
      items: ordersMapper(data.orders),
      session
    }
  }
}
