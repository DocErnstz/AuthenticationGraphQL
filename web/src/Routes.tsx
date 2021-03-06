import React from "react";
import { gql } from "@apollo/react-hooks"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useHelloQuery } from "./generated/graphql"; 
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
const Routes: React.FC = () => {
    return (<BrowserRouter>
    <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/register" component={Register}/>
    <Route exact path="/login" component={Login}/>    
    </Switch>
    </BrowserRouter>)
}

export default Routes;