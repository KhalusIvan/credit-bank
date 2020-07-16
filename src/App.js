import React, { useRef, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useParams
} from "react-router-dom";

import $ from "jquery";
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { throttle } from './script/custom.js';
import Error404 from './Components/Error404.js'


import headerThemeContext from './Contexts/HeaderThemeContext.js';
import AppLanguage from './Contexts/AppLanguage.js';
import UserRole from './Contexts/UserRole.js';
import Proxy from './Contexts/Proxy.js';


import Header from './Components/Header/Header.js';
import GuesMainPage from './Components/GuesMainPage.js';
import UserMainPage from './Components/UserMainPage.js';
import Footer from './Components/Footer.js';
import SpinerApp from './Components/SpinerApp.js';
import Separate from './Components/Separate.js';
import './style/custom.css';

function App() {
  const proxy = 'https://credit-bank-practice.herokuapp.com';
  const [appLanguage, setAppLanguage] = useState(localStorage.getItem('lang') || 'ukr');
  const headerWrapper = useRef(null);
  const [headerTheme, setHeaderTheme] = useState();
  localStorage.setItem('lang', appLanguage);
  function toggleLanguage() {
    appLanguage === 'eng' ? setAppLanguage('ukr') : setAppLanguage('eng');
  }
  function checkTheme(expectedTheme) {
    if (headerTheme === expectedTheme)
      return;
    else { setHeaderTheme(expectedTheme) };
  }
  function toogleHeaderWrapperTheme() {
    if (window.pageYOffset > 0 || document.documentElement.clientWidth <= 767) {
      headerWrapper.current.classList.add('sticky-now');
      checkTheme('navbar-light');
    }
    else {
      headerWrapper.current.classList.remove('sticky-now');
      checkTheme('navbar-dark');
    }
  }
  toogleHeaderWrapperTheme = throttle(toogleHeaderWrapperTheme, 200);
  const [userRole, setUserRole] = useState(null);
  function changeUserRole(role) {
    setUserRole(role);
  }
  console.log(proxy);
  useEffect(() => {
    async function fetchData() {
      let formEl = new FormData();
      formEl.append('token', 'sdffhiragf');
      formEl.append('fname', 'sdfsdf');
      let resp = await fetch(proxy + '/verification', {
        method: 'POST',
        body: formEl
      });
      let json = await resp.json();
      console.log(json);
      setUserRole(json.role);
      setIsUserReady(true);
      return json;
    }
    if (localStorage.getItem('token'))
      fetchData().then(json => {
        if (json.role === 'guest') {
          window.addEventListener('scroll', toogleHeaderWrapperTheme);
          window.addEventListener('resize', toogleHeaderWrapperTheme);
          toogleHeaderWrapperTheme();
          return () => {
            window.removeEventListener('scroll', toogleHeaderWrapperTheme);
            window.removeEventListener('resize', toogleHeaderWrapperTheme);
          }
        }
      });
    else { setUserRole('user'); setIsUserReady(true) }
  }, []);
  const [isUserReady, setIsUserReady] = useState(false);
  return (
    <>
      <React.StrictMode>
        <Proxy.Provider>
          <AppLanguage.Provider value={{ appLanguage: appLanguage, toggleLanguage: toggleLanguage }}>
            <UserRole.Provider value={{ userRole: userRole, changeUserRole: changeUserRole }}>
              <Router>
                {!isUserReady ? <SpinerApp /> : null}
                <div ref={headerWrapper} className={`container-fluid sticky-navigation ${userRole !== 'guest' ? 'header-not-sticky sticky-now' : ''}`}>
                  <headerThemeContext.Provider value={headerTheme}>
                    <Header />
                  </headerThemeContext.Provider>
                </div>
                <Switch>
                  <Route exact path="/">
                    <Separate role={userRole} />
                  </Route>
                  <OnlyGuest exact role={userRole} path="/guest">
                    <GuesMainPage />
                  </OnlyGuest>
                  <Route path="/guest/*">
                    <Error404 />
                  </Route>
                  <PrivateRoute path="/user" role={userRole}>
                    <UserMainPage />
                  </PrivateRoute>
                  <OnlyAdmin path="/admin" role={userRole}>
                    <UserMainPage />
                  </OnlyAdmin>
                  <Route path="*">
                    <Error404 />
                  </Route>
                </Switch>
                <Footer />
              </Router>
            </UserRole.Provider>
          </AppLanguage.Provider>
        </Proxy.Provider>
      </React.StrictMode>
    </>

  );
}
function PrivateRoute({ children, role, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        role !== 'guest' ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}
function OnlyAdmin({ children, role, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        role === 'admin' ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}
function OnlyGuest({ children, role, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        role === 'guest' ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}
export default App;
