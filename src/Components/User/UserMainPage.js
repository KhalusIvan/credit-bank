import React, { Suspense, useEffect, useContext, lazy } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import Error404 from '../Error404.js'
//import UserGiveReview from './UserReviewManagement/UserGiveReview.js';
//import UserAcc from './UserDataManagement/UserAcc.js';
//import UserCredit from './UserCreditManagement/UserCredit.js';
import Proxy from '../../Contexts/Proxy.js';
import User from '../../Contexts/User';
import Spiner from '../Spiner.js'
const UserAcc = lazy(() => import('./UserDataManagement/UserAcc.js'));
const UserCredit = lazy(() => import('./UserCreditManagement/UserCredit'));
const UserGiveReview = lazy(() => import('./UserReviewManagement/UserGiveReview'));
export default (props) => {
  const { changeUser } = useContext(User);
  const { proxy } = useContext(Proxy);
  const { user } = useContext(User);
  useEffect(() => {
    async function getUserData() {
      let response = await fetch(proxy + '/getData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
      let result = await response.json();
      console.log(result);
      changeUser(result);
    }
    if (localStorage.getItem('token'))
      getUserData();
  }, [localStorage.getItem('token')])
  let { path } = useRouteMatch();
  return (
    <div className='content'>
      <Suspense fallback={<Spiner />}>
        <Switch>
          <Route exact path={`${path}`}>
            <UserAcc />
          </Route>
          <Route path={`${path}/takeCredit`}>
            {user.email ?
              <UserCredit />
               : <Spiner />}
          </Route>
          <Route path={`${path}/review`}>
            <UserGiveReview />
          </Route>
          <Route path={`${path}/*`}>
            <Error404 />
          </Route>
        </Switch>
      </Suspense>
    </div>
  )
}
