import React from "react";
import { gql } from "@apollo/react-hooks"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useHelloQuery } from "./generated/graphql"; 

const Routes: React.FC = () => {
    return (<BrowserRouter>
    <Switch>
    <Route path="/" render={() => <div>hi!</div>}/>
    </Switch>
    </BrowserRouter>)
}

export default Routes;