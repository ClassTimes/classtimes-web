import fetch from "cross-fetch"
import {
  ApolloProvider as ApolloProviderOriginal,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client"

import { isClient } from "../config"

const GQL_SERVER_URI = "https://api.classtimes.app"

const config = isClient
  ? {
      fetch,
      uri: GQL_SERVER_URI,
      cache: new InMemoryCache().restore(window["__APOLLO_STATE__"]),
    }
  : {
      ssrMode: true,
      link: createHttpLink({
        fetch,
        uri: GQL_SERVER_URI,
        credentials: "same-origin",
        headers: {
          //   cookie: req.header("Cookie"),
        },
      }),
      cache: new InMemoryCache(),
      // link: createHttpLink({
      //   uri: "http://localhost:3010",
      //   credentials: "same-origin",
      //   headers: {
      //     cookie: req.header("Cookie"),
      //   },
      // })
    }

export const APOLLO_CLIENT = new ApolloClient(config)

export function ApolloProvider(props) {
  const { children } = props
  return (
    <ApolloProviderOriginal client={APOLLO_CLIENT}>
      {children}
    </ApolloProviderOriginal>
  )
}
