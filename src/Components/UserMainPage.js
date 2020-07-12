import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,useRouteMatch
  } from "react-router-dom";
  import Error404 from './Error404.js'
import UserOffice from './UserOffice.js';
export default (props)=>{
    let { path, url} = useRouteMatch();
    return (<div>
        <Switch>
          <Route path={`${path}/takeCredit`}>
            <div>123456</div>
          </Route>
          <Route path={`${path}/logOut`}>
            fij
          </Route>
          <Route path={`${path}/*`}>
            <Error404/>
          </Route>
        </Switch>
      </div>
    )
}