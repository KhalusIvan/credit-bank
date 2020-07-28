import React, { useRef, useEffect, useState, Children } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect, useParams
} from "react-router-dom";

import $ from "jquery";
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { throttle } from './script/custom.js';
import Error404 from './Components/Error404.js'


import headerThemeContext from './Contexts/HeaderThemeContext.js';
import AppLanguage from './Contexts/AppLanguage.js';
import User from './Contexts/User.js';
import Proxy from './Contexts/Proxy.js';


import Header from './Components/Header/Header.js';
import GuesMainPage from './Components/Guest/GuesMainPage.js';
import UserMainPage from './Components/User/UserMainPage.js';
import Footer from './Components/Footer.js';
import SpinerApp from './Components/SpinerApp.js';
import Separate from './Components/Separate.js';
import ValidateEmail from './Components/ValidateEmail';
import Fade from 'react-reveal/Fade';
import './style/custom.css';

function App() {
  const proxy = 'https://credit-bank-practice.herokuapp.com';
  const [isUserReady, setIsUserReady] = useState(false);
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

  const [user, setUser] = useState({
    avatar: null,
    credit_card: null,
    email: null,
    first_name: null,
    is_checked: false,
    passport: null,
    password: null,
    phone: null,
    role: null,
    second_name: null,
    _id: null
  });
  function changeUser(newUser) {
    setUser(newUser);
  }
  function removeUser() {
    setUser({
      avatar: null,
      credit_card: null,
      email: null,
      first_name: null,
      is_checked: false,
      passport: null,
      password: null,
      phone: null,
      role: 'guest',
      token: null,
      second_name: null,
      _id: null
    });
  }
  function changeUserAvatar(avatar) {
    let newUser = Object.assign({}, user);
    newUser.avatar = { data: null };
    newUser.avatar.data = avatar;
    setUser(newUser);
  }
  function changeUserRole(role) {
    let newUser = Object.assign({}, user);
    newUser.role = role;
    setUser(newUser);
  }
  function changeUserPassport(passport) {
    let newUser = Object.assign({}, user);
    newUser.passport = passport;
    setUser(newUser);
  }
  function changeUserCreditCard(creditCard) {
    let newUser = Object.assign({}, user);
    newUser['credit_card'] = creditCard;
    setUser(newUser);
  }
  function changeUserPhone(phone) {
    let newUser = Object.assign({}, user);
    newUser.phone = phone;
    setUser(newUser);
  }
  function changeUserName(firstName, secondName) {
    let newUser = Object.assign({}, user);
    newUser['first_name'] = firstName;
    newUser['second_name'] = secondName;
    setUser(newUser);
  }
  useEffect(() => {
    async function fetchData() {
      console.log(4);
      let resp = await fetch(proxy + '/checkUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
      let json = await resp.json();
      console.log(json);
      return json;
    }
    if (localStorage.getItem('token'))
      fetchData().then(json => {
        if (json.role !== 'guest') {
          window.removeEventListener('scroll', toogleHeaderWrapperTheme);
          window.removeEventListener('resize', toogleHeaderWrapperTheme);
        }
        else{
          window.addEventListener('scroll', toogleHeaderWrapperTheme);
          window.addEventListener('resize', toogleHeaderWrapperTheme);
          toogleHeaderWrapperTheme();
        }
        changeUserRole(json.role);
        setIsUserReady(true);
      });
    else {
      changeUserRole('guest');
      window.addEventListener('scroll', toogleHeaderWrapperTheme);
      window.addEventListener('resize', toogleHeaderWrapperTheme);
      toogleHeaderWrapperTheme();
      setIsUserReady(true);
    }
  }, []);
  return (
    <>
      <React.StrictMode>
        <Proxy.Provider value={{ proxy: proxy }}>
          <AppLanguage.Provider value={{ appLanguage: appLanguage, toggleLanguage: toggleLanguage }}>
            <User.Provider value={{ user: user, removeUser: removeUser, changeUserAvatar: changeUserAvatar, changeUserName: changeUserName, changeUserRole: changeUserRole, changeUser: changeUser, changeUserPassport: changeUserPassport, changeUserCreditCard: changeUserCreditCard, changeUserPhone: changeUserPhone }}>
              <Router>
                {!isUserReady ? <SpinerApp /> : null}
                <div ref={headerWrapper} className={`container-fluid sticky-navigation ${user.role !== 'guest' ? 'header-not-sticky sticky-now' : ''}`}>
                  <headerThemeContext.Provider value={headerTheme}>
                    <Header />
                  </headerThemeContext.Provider>
                </div>
                <Switch>
                  <Route exact path="/">
                    <Separate role={user.role} />
                  </Route>
                  <Route path="/abd/:token" children={<ValidateEmail />} />
                  <OnlyGuest exact role={user.role} path="/guest">
                    <Fade timeout={500}><GuesMainPage /></Fade>
                  </OnlyGuest>
                  <Route path="/guest/*">
                    <Error404 />
                  </Route>
                  <PrivateRoute path="/user" role={user.role}>
                    <UserMainPage />
                  </PrivateRoute>
                  <OnlyAdmin path="/admin" role={user.role}>
                    <Fade timeout={500}><div>THIS IS ADMIN PANEL</div></Fade>
                  </OnlyAdmin>
                  <Route path="*">
                    <Error404 />
                  </Route>
                </Switch>
                <Footer />
              </Router>
            </User.Provider>
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
