import React, { useContext, useRef, useEffect, useState } from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { Link } from "react-router-dom";
import '../../style/header.css';
import headerThemeContext from '../../Contexts/HeaderThemeContext.js';
import AppLanguage from '../../Contexts/AppLanguage.js';
import Logo from '../Logo.js';
import NavItemsForGuests from './NavItemsForGuests.js';
import Switcher from '../Switcher/Switcher.js';
import User from '../../Contexts/User';
const Header = (props) => {
    const theme = useContext(headerThemeContext);
    const [path, setPath] = useState(document.location.pathname);
    const language = useContext(AppLanguage);
    const { user,changeUserRole } = useContext(User);
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
        if (link && activeElement) {
            activeElement.current.classList.remove('active');
            link.parentElement.classList.add('active');
            activeElement.current = link.parentElement;
        }
    }
    useEffect(() => {
        language.appLanguage === 'eng' ? languageSwitcherSmall.current.checked = languageSwitcherMiddle.current.checked = true : languageSwitcherSmall.current.checked = languageSwitcherMiddle.current.checked = false;
    }, [language.appLanguage]);
    function toggleSwitcher() {
        if (languageSwitcherSmall.current.checked === false)
            languageSwitcherSmall.current.checked = languageSwitcherMiddle.current.checked = true;
        else languageSwitcherSmall.current.checked = languageSwitcherMiddle.current.checked = false;
        language.toggleLanguage();
    }
    return (
        <header className="container">
            <nav className={`navbar navbar-expand-md ${user.role === 'guest' ? theme : 'navbar-light'}`}>
                <NavLink onClick={(e) => user.role === 'guest' ? document.querySelector('.nav-item a[href="/guest#up"]').click() : null} to={user.role === 'guest' ? `/guest#up` : ''} className='navbar-brand d-flex align-items-center' activeClassName='n' scroll={el => scrollWithOffset(el, 0)}><div className='header-logo ml-3'><Logo /></div></NavLink>
                <ul className="navbar-nav d-inline-block d-md-none">
                    <li className='nav-link' style={{ paddingBottom: '2px' }}>
                        <div className='language-switcher mr-1 nav-item d-flex align-items-center' onClick={toggleSwitcher}>
                            <Switcher refElement={languageSwitcherSmall} />
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
                        {user.role === 'guest' ?
                            <NavItemsForGuests scrollWithOffset={scrollWithOffset} activeElement={activeElement} toogleActive={toogleActive} navList={[{ label: language.appLanguage === 'eng' ? 'Home' : 'Додому', href: '/guest#up' }, { label: language.appLanguage === 'eng' ? 'Terms' : "Умови", href: '/guest#credit-conditions' }, { label: language.appLanguage === 'eng' ? 'Benefits' : "Переваги", href: '/guest#why-us' }, { label: language.appLanguage === 'eng' ? 'Instruction' : "Інструкція", href: '/guest#instruction' }]} />
                            : (<>
                                <li className={`nav-item ${path === '/user' ? 'active' : ''}`}><Link className='nav-link' onClick={() => setPath('/user')} to={`/user`}>{language.appLanguage === 'eng' ? 'Account' : 'Кабінет'}</Link></li>
                                <li className={`nav-item ${path === '/user/takeCredit' ? 'active' : ''}`}><Link className='nav-link' onClick={() => setPath('/user/takeCredit')} to={`/user/takeCredit`}>{language.appLanguage === 'eng' ? 'Loan' : 'Кредит'}</Link></li>
                                <li className={`nav-item ${path === '/user/review' ? 'active' : ''}`}><Link className='nav-link' onClick={() => setPath('/user/review')} to={`/user/review`}>{language.appLanguage === 'eng' ? 'Review' : 'Відгук'}</Link></li>
                                <li className={`nav-item ${path === '/user/logOut' ? 'active' : ''}`}><Link className='nav-link' onClick={() => { localStorage.removeItem('token'); changeUserRole('guest')/*  document.location.reload() */ }} to={`/guest`}>{language.appLanguage === 'eng' ? 'Log out' : 'Вийти'}</Link></li>
                            </>)
                        }
                    </ul>
                </div>
                <ul className="navbar-nav d-none d-md-inline-block">
                    <li className='nav-link' style={{ paddingBottom: '2px' }}>
                        <div className='language-switcher ml-4 nav-item d-flex align-items-center' onClick={toggleSwitcher}>
                            <Switcher refElement={languageSwitcherMiddle} />
                            <label className="mb-0 ml-1">Eng</label>
                        </div>
                    </li>
                </ul>
            </nav>
        </header >
    )
}
export default Header;