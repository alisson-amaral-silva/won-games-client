import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink
} from '@apollo/client'
import { useMemo } from 'react'

let apolloClient: ApolloClient<NormalizedCacheObject>

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: 'http://localhost:1337/graphql'
    }),
    cache: new InMemoryCache()
  })
}

export function initializeApollo(initialState = {}) {
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

export function useApollo(initialState = {}) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
