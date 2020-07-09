import React, {useContext, useRef, useEffect, useState } from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import '../../style/header.css';
import headerThemeContext from '../../Contexts/HeaderThemeContext.js';
import AppLanguage from '../../Contexts/AppLanguage.js';
import Logo from '../Logo.js';
import NavItemsForGuests from './NavItems.js';
import Switcher from '../Switcher/Switcher.js';
const Header = (props) => {
    const theme = useContext(headerThemeContext);
    const language = useContext(AppLanguage);
    const activeElement = useRef(null);
    const languageSwitcherSmall = useRef(null);
    const languageSwitcherMiddle = useRef(null);
    const scrollWithOffset = (el, offset) => {
        const elementPosition = el.offsetTop - offset;
        window.scroll({
            top: elementPosition,
            left: 0,
            behavior: "smooth"
        });
    }
    function toogleActive(link) {
        activeElement.current.classList.remove('active');
        link.parentElement.classList.add('active');
        activeElement.current = link.parentElement;
    }

    function toggleSwitcher(){
        if(languageSwitcherSmall.current.checked === false)
            languageSwitcherSmall.current.checked = languageSwitcherMiddle.current.checked = true;
        else  languageSwitcherSmall.current.checked = languageSwitcherMiddle.current.checked = false;
        language.toggleLanguage();
    }
    return (
        <header className="container">
            <nav className={`navbar navbar-expand-md ${theme}`}>
                <NavLink onClick={(e) =>  document.querySelector('.nav-item a[href="/#up"]').click()} to="/#up" className='navbar-brand d-flex align-items-center' activeClassName='n' scroll={el => scrollWithOffset(el, 0)}><div className='header-logo ml-3'><Logo /></div></NavLink>
                <ul className="navbar-nav d-inline-block d-md-none">
                        <li className='nav-link' style={{ paddingBottom: '2px' }}>
                            <div className='language-switcher mr-1 nav-item d-flex align-items-center'onClick={toggleSwitcher}>
                                <Switcher refElement={languageSwitcherSmall}/>
                                <label htmlFor='languageSwitcher' className="mb-0 ml-1">Eng</label>
                            </div>
                        </li>
                </ul>
                <div className="nav-buttons">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav navbar-links ml-auto">
                        <NavItemsForGuests scrollWithOffset={scrollWithOffset} activeElement={activeElement} toogleActive={toogleActive} navList={[{ label: language.appLanguage === 'eng' ? 'Home' : 'Додому', href: '/#up' }, { label: language.appLanguage === 'eng' ? 'Terms' : "Умови", href: '/#credit-conditions' }, { label: language.appLanguage === 'eng' ? 'Balal' : "Блала", href: '/#sdfs' }, { label: language.appLanguage === 'eng' ? 'Patient' : "Пацієнт", href: '/#patient' }]} />
                    </ul>
                </div>
                <ul className="navbar-nav d-none d-md-inline-block">
                    <li className='nav-link' style={{ paddingBottom: '2px' }}>
                        <div className='language-switcher ml-4 nav-item d-flex align-items-center' onClick={toggleSwitcher}>
                            <Switcher refElement={languageSwitcherMiddle}/>
                            <label className="mb-0 ml-1">Eng</label>
                        </div>
                    </li>
                </ul>
            </nav>
        </header >
    )
}
export default Header;