import fetch from "cross-fetch"
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client"

import { CalendarWithData } from "../../components/Calendar"
import { isClient } from "../../config"

const GQL_SERVER_URI = "https://classtimes.herokuapp.com/graphql"

const config = isClient
  ? {
      fetch,
      uri: GQL_SERVER_URI,
      cache: new InMemoryCache(),
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
const client = new ApolloClient(config)

export function Page() {
  return (
    <ApolloProvider {...{ client }}>
      <div className="App">
        <CalendarWithData />
      </div>
    </ApolloProvider>
  )
}
