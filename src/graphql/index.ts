import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
export const apiUrl = "https://countries.trevorblades.com"
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: apiUrl
});

export const LIST_COUNTRIES = gql`
  query GetCountries($filter: String) {
    countries(filter: {code: {regex: $filter}}) {
      code
      name
    }
}`;