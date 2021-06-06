import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "@apollo/react-hooks";
import Routes from "./Routes";

const client = new ApolloClient({
  uri: "http://localhost:4001/graphql"
});


ReactDOM.render(<ApolloProvider client={client as any }><Routes/></ApolloProvider>,document.getElementById("root"));