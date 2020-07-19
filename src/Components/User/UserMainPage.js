import React, {Suspense, useEffect, useContext} from 'react';
import {
    Switch,
    Route,
    useRouteMatch,
  } from "react-router-dom";
  import Error404 from '../Error404.js'
import UserGiveReview from './UserGiveReview.js';
import UserAcc from './UserAcc.js';
import TakeCredit from './UserCredit.js';
import Proxy from '../../Contexts/Proxy.js';
import User from '../../Contexts/User';
import Spiner from '../Spiner.js'
export default (props)=>{
    const {changeUser} = useContext(User);
    const {proxy} = useContext(Proxy);
    const {user} = useContext(User);
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
        changeUser(result);
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
            {user.email ? <TakeCredit/> : <Spiner/>}
          </Route>
          <Route path={`${path}/review`}>
            <Suspense fallback={<Spiner/>}>
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
