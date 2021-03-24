import fetch from "cross-fetch"
import {
  ApolloProvider as ApolloProviderOriginal,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

import { isClient } from "../config"

const GQL_SERVER_URI = "https://api.classtimes.app/graphql"

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem("token")
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDcyNjFlZDU3ZDJhYTAwNjczMzQzYTUiLCJ1c2VybmFtZSI6InBldHRlciIsImlhdCI6MTYxODEwOTE5MSwiZXhwIjoxNjE4OTczMTkxfQ.Uagfr2vHGgOwmP5xFPdk69Ti8CZVRJy0oizsgiVDic0",
    },
  }
})

const config = isClient
  ? {
      fetch,
      uri: GQL_SERVER_URI,
      cache: new InMemoryCache().restore(window["__APOLLO_STATE__"]),
    }
  : {
      ssrMode: true,
      link: authLink.concat(
        createHttpLink({
          fetch,
          uri: GQL_SERVER_URI,
          credentials: "same-origin",
          headers: {
            //   cookie: req.header("Cookie"),
          },
        })
      ),
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
