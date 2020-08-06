import React, { Suspense, useEffect, useContext, lazy } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import Error404 from '../Error404.js'
import Proxy from '../../Contexts/Proxy.js';
import User from '../../Contexts/User';
import Spiner from '../Spiner.js'
const UserAcc = lazy(() => import('../User/UserDataManagement/UserAcc'));
const AllUsers = lazy(()=>import('./AllUsers'));
export default (props) => {
  const { changeUser } = useContext(User);
  const { proxy, changeParam } = useContext(Proxy);
  const { user } = useContext(User);
  const userNameInUrl = user.email ? user.first_name.toLowerCase() + '_' + user.second_name.toLowerCase() : '';
  setTimeout(() => {changeParam(userNameInUrl);}, 0);//Не можна міняти контексти за один такт відразу. Тому для цього використовую нульову затримку (1 такт процесора)
  let { path } = useRouteMatch();
  return (
    <div className='content'>
      <Suspense fallback={<Spiner />}>
        <Switch>
          <Route exact path={`${path}`}>
            {user.email ? <Redirect to={`${path}/${userNameInUrl}`} /> : <UserAcc />}
          </Route>
          <Route path={`${path}/users`}>
            <AllUsers/>
          </Route>
          <Route path={`${path}/reviews`}>
            <div>All reviews</div>
          </Route>
          <Route exact path={`${path}/:userName`}>
            <UserAcc userNameInUrl={userNameInUrl} />
          </Route>
          <Route path={`${path}/*`}>
            <Error404 />
          </Route>
        </Switch>
      </Suspense>
    </div>
  )
}
