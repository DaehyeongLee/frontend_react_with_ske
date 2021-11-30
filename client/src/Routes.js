import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import {
    PublicRouteWithLayout,
    PrivateRouteWithLayout
} from "./components"
import {
    MainLayout,
    DefaultLayout
} from "./layouts"
import {
    Board
} from "./views"

const BoardRoute = () => <PublicRouteWithLayout component={Board} layout={MainLayout}/>

function Routes() {

    return (
        <Switch>
            <Redirect exact from="/" to="/" />
            <Route path={`/board`} component={BoardRoute}/>
        </Switch>
    )
}

export default Routes
