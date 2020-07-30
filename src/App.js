import React, { useRef, useEffect, useState, Children,lazy, Suspense } from 'react';
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
import Footer from './Components/Footer.js';
import SpinerApp from './Components/SpinerApp.js';
import Separate from './Components/Separate.js';
import ConfirmEmail from './Components/ConfirmEmail';
import Fade from 'react-reveal/Fade';
import './style/custom.css';
const UserMainPage = lazy(() => import('./Components/User/UserMainPage'));
const ValidateEmail = lazy(() => import('./Components/ValidateEmail'))
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
  function toogleHeaderWrapperTheme() {
    if (window.pageYOffset > 0 || document.documentElement.clientWidth <= 767) {
      headerWrapper.current.classList.add('sticky-now');
      setHeaderTheme('navbar-light');
    }
    else {
      headerWrapper.current.classList.remove('sticky-now');
      setHeaderTheme('navbar-dark');
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
      let resp = await fetch(proxy + '/checkUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
      let json = await resp.json();
      return json;
    }
    if (localStorage.getItem('token'))
      fetchData().then(json => {
        changeUserRole(json.role);
        setIsUserReady(true);
      });
    else {
      changeUserRole('guest');
      setIsUserReady(true);
    }
  }, [localStorage.getItem('token')]);
  useEffect(()=>{
    if(user.role === 'guest'){
      console.log("ADD LISTENER");
      window.addEventListener('scroll', toogleHeaderWrapperTheme);
      window.addEventListener('resize', toogleHeaderWrapperTheme);
      toogleHeaderWrapperTheme();
    }
    return ()=>{
      window.removeEventListener('scroll', toogleHeaderWrapperTheme);
      window.removeEventListener('resize', toogleHeaderWrapperTheme);
    }
  },[user.role])
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
                <Suspense fallback={<SpinerApp />}>
                <Switch>
                  <Route exact path="/">
                    <Separate role={user.role} />
                  </Route>
                  <Route path="/confirm/:email" children={<ConfirmEmail />} />
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
                  <Route path='user/aallo'>
                    <div>allo</div>
                  </Route>
                  <OnlyAdmin path="/admin" role={user.role}>
                    <Fade timeout={500}><div>THIS IS ADMIN PANEL</div></Fade>
                  </OnlyAdmin>
                  <Route path="*">
                    <Error404 />
                  </Route>
                </Switch>
                </Suspense>
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
        role !== 'guest' && role !== 'admin'?(
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
