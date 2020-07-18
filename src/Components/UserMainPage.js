import React, {Suspense, useState, useEffect, useContext} from 'react';
import {
    Switch,
    Route,
    useRouteMatch,
  } from "react-router-dom";
  import Error404 from './Error404.js'
import UserGiveReview from './UserGiveReview.js';
import UserAcc from './UserAcc.js';
import TakeCredit from './TakeCredit.js';
import Proxy from '../Contexts/Proxy.js';
import User from '../Contexts/User';
export default (props)=>{
    const {changeUser} = useContext(User);
    const [user,setUser] = useState(null);
    const {proxy} = useContext(Proxy);
    useEffect(()=>{
      async function getUserData() {
        let response = await fetch(proxy+'/getData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        let result = await response.json();
        //setTimeout(() => {
          changeUser(result);
        //}, 3000);
      }
      if(localStorage.getItem('token'))
        getUserData();
    },[])
    let { path} = useRouteMatch();
    return (<div className='content'>
        <Switch>
          <Route exact path={`${path}`}>
            <UserAcc/>
          </Route>
          <Route path={`${path}/takeCredit`}>
            <TakeCredit/>
          </Route>
          <Route path={`${path}/review`}>
            <Suspense fallback={<h1>Loading</h1>}>
              <UserGiveReview/>
            </Suspense>
          </Route>
          <Route path={`${path}/*`}>
            <Error404/>
          </Route>
        </Switch>
      </div>
    )
}
