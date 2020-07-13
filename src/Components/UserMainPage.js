import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,useRouteMatch,withRouter
  } from "react-router-dom";
  import Error404 from './Error404.js'
  
import UserOffice from './UserOffice.js';
import UserRole from '../Contexts/UserRole.js';
export default (props)=>{
 
    const changeUserRole = useContext(UserRole).changeUserRole;
    let { path, url} = useRouteMatch();
    return (<div>
        <Switch>
          <Route path={`${path}/takeCredit`}>
            <div>123456</div>
          </Route>
          <Route path={`${path}/logOut`}>
            hkjhgkhgjk
          </Route>
          <Route path={`${path}/*`}>
            <Error404/>
          </Route>
        </Switch>
      </div>
    )
}
