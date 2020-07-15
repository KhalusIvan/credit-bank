import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,useRouteMatch,withRouter, useParams
  } from "react-router-dom";
  import Error404 from './Error404.js'
import UserGiveReview from './UserGiveReview.js';
import UserAcc from './UserAcc.js';
import UserRole from '../Contexts/UserRole.js';
import TakeCredit from './TakeCredit.js';
export default (props)=>{
 
    const changeUserRole = useContext(UserRole).changeUserRole;
    let { path, url} = useRouteMatch();
    let { id } = useParams();
    return (<div className='content'>
        <Switch>
          <Route exact path={`${path}`}>
            <UserAcc/>
          </Route>
          <Route path={`${path}/takeCredit`}>
            <TakeCredit/>
          </Route>
          <Route path={`${path}/review`}>
            <UserGiveReview/>
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
