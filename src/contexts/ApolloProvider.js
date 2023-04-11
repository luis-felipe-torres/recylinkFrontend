import { ApolloProvider } from "@apollo/client";
import apolloClient from "../lib/apolloClient";

const CustomApolloProvider = ({ children }) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default CustomApolloProvider;
