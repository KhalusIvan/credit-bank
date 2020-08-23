import React, { Suspense, useEffect, useContext, lazy, useState } from 'react';
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
const AllUsers = lazy(() => import('./AllUsers'));
const AllReviews = lazy(() => import('./AllReviews'));
const AllCredits = lazy(() => import('./CreditManagement/AllCredits'));
export default (props) => {
  const numOfItemsInPagination = 5;
  const numOfReviewsInPagination = 6;
  const { user, changeUser } = useContext(User);
  const { proxy, changeParam } = useContext(Proxy);

  const [checkUserArray, setCheckUserArray] = useState([]);
  const [notCheckUserArray, setNotCheckUserArray] = useState([]);
  const [dataNotReadyUserArray, setDataNotReadyUserArray] = useState([]);
  const [reviewsArray, setReviewsArray] = useState([]);
  const [creditsArray, setCreditsArray] = useState();

  const [numOfCheckUser, setNumOfCheckUser] = useState();
  const [numOfNotCheckUser, setNumOfNotCheckUser] = useState();
  const [numOfDataNotReadyUser, setNumOfDataNotReadyUser] = useState();
  const [numOfReviews, setNumofReviews] = useState();

  let { path } = useRouteMatch();
  function changeCheckUserArray(newArray) {
    setCheckUserArray(newArray.slice());
  }
  function changeNotCheckUserArray(newArray) {
    setNotCheckUserArray(newArray.slice());
  }
  function changeDataNotReadyUserArray(newArray) {
    setDataNotReadyUserArray(newArray.slice());
  }
  function changeCreditsArray(newArray) {
    setCreditsArray(newArray.slice())
  }
  useEffect(() => {
    async function getNumbersOfUser() {
      Promise.all([
        fetch(proxy + '/getAdminUsersCountChecked', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('adminToken')
          },
        }),
        fetch(proxy + '/getAdminUsersCountUnchecked', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('adminToken')
          },
        }),
        fetch(proxy + '/getAdminUserCountNotReady', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('adminToken')
          },
        }),
        fetch(proxy + '/getAdminCommentsCount', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('adminToken')
          },
        })
      ]).then(responses => {
        for (let r of responses) {
          if (r.status === 401) {
            localStorage.removeItem('adminToken');
            return;
          }
        }
        return Promise.all(responses.map(r => r.json()))
      })
        .then(nums => {
          const [check, uncheck, notReady, reviews] = nums.map(num => num.length);
          setNumOfCheckUser(check);
          setCheckUserArray(new Array(Math.ceil(check / numOfItemsInPagination)));
          setNumOfNotCheckUser(uncheck);
          setNotCheckUserArray(new Array(Math.ceil(uncheck / numOfItemsInPagination)));
          setNumOfDataNotReadyUser(notReady);
          setDataNotReadyUserArray(new Array(Math.ceil(notReady / numOfItemsInPagination)));
          setNumofReviews(reviews);
          setReviewsArray(new Array(Math.ceil(reviews / numOfReviewsInPagination)));
        }).catch(err => console.log(err.message));
    }
    getNumbersOfUser();
  }, [])
  useEffect(() => {
    fetch(proxy + '/getCreditsTypes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('adminToken')
      }
    }).then(response => response.json()).then(json => {
      console.log(json);
      if (json.status === 'error') {
        return;
      }
      setCreditsArray(json);
    })
  }, []);
  useEffect(() => {
    async function getUserData() {
      let response = await fetch(proxy + '/getData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('adminToken')
        }
      });
      let result = await response.json();
      changeUser(result);//Цей контекст міняю відразу
    }
    if (localStorage.getItem('adminToken'))
      getUserData();
  }, []);
  const userNameInUrl = user.email ? user.first_name.toLowerCase() + '_' + user.second_name.toLowerCase() : '';
  setTimeout(() => { changeParam(userNameInUrl); }, 0);//Не можна міняти контексти за один такт відразу. Тому для цього використовую нульову затримку (1 такт процесора)
  return (
    <div className='content'>
      <Suspense fallback={<Spiner />}>
        <Switch>
          <Route exact path={`${path}`}>
            {user.email ? <Redirect to={`${path}/${userNameInUrl}`} /> : <UserAcc />}
          </Route>
          <Route path={`${path}/users`}>
            {numOfCheckUser >= 0 && numOfNotCheckUser >= 0 && numOfDataNotReadyUser >= 0 ?
              <AllUsers numOfItemsInPagination={numOfItemsInPagination} numOfCheckUser={numOfCheckUser} numOfNotCheckUser={numOfNotCheckUser} numOfDataNotReadyUser={numOfDataNotReadyUser} changeCheckUserArray={changeCheckUserArray} changeNotCheckUserArray={changeNotCheckUserArray} changeDataNotReadyUserArray={changeDataNotReadyUserArray} checkUserArray={checkUserArray} notCheckUserArray={notCheckUserArray} dataNotReadyUserArray={dataNotReadyUserArray} />
              : <Spiner />
            }
          </Route>
          <Route path={`${path}/reviews`}>
            {numOfReviews >= 0 ?
              <AllReviews numOfReviews={numOfReviews} numOfItemsInPagination={numOfReviewsInPagination} reviewsArray={reviewsArray} setReviewsArray={setReviewsArray} />
              : <Spiner />
            }
          </Route>
          <Route path={`${path}/credits`}>
            {creditsArray ?
              <AllCredits changeCreditsArray={changeCreditsArray} creditsArray={creditsArray} />
              : <Spiner />
            }
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
