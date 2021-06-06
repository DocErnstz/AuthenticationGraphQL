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
    <Route path="/" component={Home}/>
    <Route path="/register" component={Register}/>
    <Route path="/login" component={Login}/>    
    </Switch>
    </BrowserRouter>)
}

export default Routes;