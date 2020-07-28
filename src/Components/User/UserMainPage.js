import React, { Suspense, useEffect, useContext } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import Error404 from '../Error404.js'
import UserGiveReview from './UserReviewManagement/UserGiveReview.js';
import UserAcc from './UserDataManagement/UserAcc.js';
import UserCredit from './UserCreditManagement/UserCredit.js';
import Proxy from '../../Contexts/Proxy.js';
import User from '../../Contexts/User';
import Spiner from '../Spiner.js'
import Fade from 'react-reveal/Fade';

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
      changeUser(result);
    }
    if (localStorage.getItem('token'))
      getUserData();
  }, [])
  let { path } = useRouteMatch();
  return (
    <div className='content'>
      <Switch>
        <Route exact path={`${path}`}>
          <Fade timeout={500}>
            <UserAcc />
          </Fade>
        </Route>
        <Route path={`${path}/takeCredit`}>
            {user.email ? <Fade timeout={500}> 
            <Suspense fallback={<Spiner/>}>
              <UserCredit /> 
            </Suspense>
            </Fade> : <Spiner />}
        </Route>
        <Route path={`${path}/review`}>
          <Suspense fallback={<Spiner />}>
            <Fade timeout={500}>
              <UserGiveReview />
            </Fade>
          </Suspense>
        </Route>
        <Route path={`${path}/*`}>
          <Fade timeout={500}>
            <Error404 />
          </Fade>
        </Route>
      </Switch>
    </div>
  )
}
