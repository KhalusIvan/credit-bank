import React, { Suspense, useEffect, useContext, lazy } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect,
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
  const { proxy,changeParam } = useContext(Proxy);
  const { user } = useContext(User);
  useEffect(() => {
    async function getUserData() {
      console.log(2);
      let response = await fetch(proxy + '/getData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
      console.log(7);
      let result = await response.json();
      changeUser(result);//Цей контекст міняю відразу
    }
    if (localStorage.getItem('token'))
      getUserData();
  }, [localStorage.getItem('token')]);
  const userNameInUrl = user.email ? user.first_name.toLowerCase() + '_' + user.second_name.toLowerCase() : '';
  setTimeout(() => {changeParam(userNameInUrl);}, 0);//Не можна міняти контексти за один такт відразу. Тому для цього використовую нульову затримку (1 такт процесора)
  let { path } = useRouteMatch();
  return (
    <div className='content'>
      <Suspense fallback={<Spiner />}>
        <Switch>
          <Route exact path={`${path}`}>
            {user.email ?  <Redirect to={`${path}/${userNameInUrl}`}/> : <UserAcc />}
          </Route>
          <Route path={`${path}/takeCredit`}>
            {user.email ?  <Redirect to={`${path}/${userNameInUrl}/takeCredit`}/> : <UserAcc />}
          </Route>
          <Route path={`${path}/review`}>
            {user.email ?  <Redirect to={`${path}/${userNameInUrl}/review`}/> : <UserGiveReview />}
          </Route>
          <Route exact path={`${path}/:userName`}>
            <UserAcc userNameInUrl={userNameInUrl} />
          </Route>
          <Route path={`${path}/:userName/takeCredit`}>
            {user.email ?
              <UserCredit userNameInUrl={userNameInUrl} />
               : <Spiner />}
          </Route>
          <Route path={`${path}/:userName/review`}>
            <UserGiveReview userNameInUrl={userNameInUrl} />
          </Route>
          <Route path={`${path}/*`}>
            <Error404 />
          </Route>
        </Switch>
      </Suspense>
    </div>
  )
}
