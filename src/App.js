import React, { useRef, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import $ from "jquery";
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { throttle } from './script/custom.js';

import headerThemeContext from './Contexts/HeaderThemeContext.js';
import AppLanguage from './Contexts/AppLanguage.js';
import UserRole from './Contexts/UserRole.js';

import Header from './Components/Header/Header.js';
import GuesMainPage from './Components/GuesMainPage.js';


function App() {

  const [appLanguage, setAppLanguage] = useState('ukr');
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

  const [userRole, setUserRole] = useState('guest');
  useEffect(() => {
    window.addEventListener('scroll', toogleHeaderWrapperTheme);
    window.addEventListener('load', toogleHeaderWrapperTheme);
    window.addEventListener('resize', toogleHeaderWrapperTheme);
    return () => {
      window.removeEventListener('scroll', toogleHeaderWrapperTheme);
      window.removeEventListener('load', toogleHeaderWrapperTheme);
      window.removeEventListener('resize', toogleHeaderWrapperTheme);
    }
  });
  return (
    <>
      <React.StrictMode>
        <AppLanguage.Provider value={{ appLanguage: appLanguage, toggleLanguage: toggleLanguage }}>
          <UserRole.Provider value={userRole}>
            <Router>
              <div ref={headerWrapper} className='container-fluid sticky-navigation'>
                <headerThemeContext.Provider value={headerTheme}>
                  <Header />
                </headerThemeContext.Provider>
              </div>
              <GuesMainPage />
            </Router>
          </UserRole.Provider>
        </AppLanguage.Provider>
      </React.StrictMode>
    </>

  );
}

export default App;
