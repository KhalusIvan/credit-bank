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

import Topics from './Components/Topics.js';

import $ from "jquery";
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { throttle } from './script/custom.js';
import Error404 from './Components/Error404.js'
import headerThemeContext from './Contexts/HeaderThemeContext.js';
import AppLanguage from './Contexts/AppLanguage.js';
import UserRole from './Contexts/UserRole.js';

import Header from './Components/Header/Header.js';
import GuesMainPage from './Components/GuesMainPage.js';
import UserMainPage from './Components/UserMainPage.js';
import Footer from './Components/Footer.js';
import SpinerApp from './Components/SpinerApp.js';
import Separate from './Components/Separate.js';
import './style/custom.css';
function App() {
  const [appLanguage, setAppLanguage] = useState(localStorage.getItem('lang') || 'ukr');
  localStorage.setItem('lang', appLanguage);
  function toggleLanguage() {
    appLanguage === 'eng' ? setAppLanguage('ukr') : setAppLanguage('eng');
  }
  const headerWrapper = useRef(null);
  const [headerTheme, setHeaderTheme] = useState('navbar-dark');
  function checkTheme(expectedTheme) {
    if (headerTheme === expectedTheme)
      return;
    else toogleHeaderTheme();
  }
  function toogleHeaderTheme() {
    headerTheme === 'navbar-dark' ? setHeaderTheme('navbar-light') : setHeaderTheme('navbar-dark');
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
  useEffect(() => {
    async function fetchData() {
      let formEl = new FormData();
      formEl.append('token', 'sdffhiragf')
      let resp = await fetch('/verificToken', {
        method: 'POST',
        credentials: "include",
        body: formEl
      });
      let json = await resp.json();
      setUserRole(json.role);
      setIsUserReady(true);
      console.log('now');
    }
     //if (localStorage.getItem('token'))
      fetchData();
   // else { setUserRole('guest'); setIsUserReady(true) } 
  });
  const [isUserReady, setIsUserReady] = useState(false);

  useEffect(() => {
    if (userRole === 'guest') {
      window.addEventListener('scroll', toogleHeaderWrapperTheme);
      window.addEventListener('load', toogleHeaderWrapperTheme);
      window.addEventListener('resize', toogleHeaderWrapperTheme);
      return () => {
        window.removeEventListener('scroll', toogleHeaderWrapperTheme);
        window.removeEventListener('load', toogleHeaderWrapperTheme);
        window.removeEventListener('resize', toogleHeaderWrapperTheme);
      }
    }

  }, [userRole]);
  console.log(userRole);
  return (
    <>
      <React.StrictMode>
        <AppLanguage.Provider value={{ appLanguage: appLanguage, toggleLanguage: toggleLanguage }}>
          <UserRole.Provider value={{ userRole: userRole, changeUserRole: changeUserRole }}>
            <Router>
              {!isUserReady ? <SpinerApp /> : null}
              <div ref={headerWrapper} className={`container-fluid sticky-navigation ${userRole !== 'guest' ? 'header-not-sticky sticky-now' : null}`}>
                <headerThemeContext.Provider value={headerTheme}>
                  <Header />
                </headerThemeContext.Provider>
              </div>
              <Switch>
                <Route exact path="/">
                  <Separate role={userRole} />
                </Route>
                <Route exact path="/guest">
                  <GuesMainPage />
                </Route>
                <Route path="/guest/*">
                  <Error404/>
                </Route>
                <PrivateRoute path="/user" role={userRole}>
                  <UserMainPage />
                </PrivateRoute>
                <PrivateRoute path="/admin" role={userRole}>
                  <UserMainPage />
                </PrivateRoute>
                <Route path="*">
                  <Error404/>
                </Route>
              </Switch>
              <Footer />
            </Router>
          </UserRole.Provider>
        </AppLanguage.Provider>
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
export default App;
