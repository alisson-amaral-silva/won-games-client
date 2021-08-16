import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink
} from '@apollo/client'
import { concatPagination } from '@apollo/client/utilities'
import { useMemo } from 'react'
import apolloCache from './apolloCache'

let apolloClient: ApolloClient<NormalizedCacheObject | null>

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: 'http://localhost:1337/graphql'
    }),
    cache: apolloCache
  })
}

export function initializeApollo(initialState = null) {
  //serve para verificar se ja existe uma instancia para não criar outra
  const apolloClientGlobal = apolloClient ?? createApolloClient()

  // se ja existir um estado inicial, ele restaura o estado inicial para o global ("cache")
  if (initialState) {
    apolloClientGlobal.cache.restore(initialState)
  }

  // sempre inicializando o srr com cache limpo
  if (typeof window === 'undefined') return apolloClientGlobal
  apolloClient = apolloClient ?? apolloClientGlobal

  return apolloClient
}

export function useApollo(initialState = null) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
