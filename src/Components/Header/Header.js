import React, { useContext, useRef, useEffect, useState } from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { Link } from "react-router-dom";
import '../../style/header.css';
import headerThemeContext from '../../Contexts/HeaderThemeContext.js';
import Proxy from '../../Contexts/Proxy'
import AppLanguage from '../../Contexts/AppLanguage.js';
import Logo from '../Logo.js';
import NavItemsForGuests from './NavItemsForGuests.js';
import Switcher from '../Switcher/Switcher.js';
import User from '../../Contexts/User';
const Header = (props) => {
    const theme = useContext(headerThemeContext);
    const [path, setPath] = useState(document.location.pathname);
    const language = useContext(AppLanguage);
    const { user, changeUserRole } = useContext(User);
    const {param,changeParam} = useContext(Proxy);
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
                <NavLink onClick={() => user.role === 'guest' ? document.querySelector('.nav-item a[href="/guest#up"]').click() : null} to={user.role === 'guest' ? `/guest#up` : user.role === 'admin' ? '/admin' : ''} className='navbar-brand d-flex align-items-center' activeClassName='n' scroll={el => scrollWithOffset(el, 0)}><div className='header-logo ml-3'><Logo /></div></NavLink>
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
                            <NavItemsForGuests scrollWithOffset={scrollWithOffset} activeElement={activeElement} toogleActive={toogleActive} navList={[{ label: language.appLanguage === 'eng' ? 'Home' : '????????????', href: '/guest#up' }, { label: language.appLanguage === 'eng' ? 'Terms' : "??????????", href: '/guest#credit-conditions' }, { label: language.appLanguage === 'eng' ? 'Benefits' : "????????????????", href: '/guest#why-us' }, { label: language.appLanguage === 'eng' ? 'Instruction' : "????????????????????", href: '/guest#instruction' }]} />
                            : user.role === 'user' ? (<>
                                <li className={`nav-item ${path === '/user/'+param ? 'active' : ''}`}><Link className='nav-link' onClick={() => setPath('/user/'+param)} to={`/user${user.email?'/':''}${param}`}>{language.appLanguage === 'eng' ? 'Account' : '??????????????'}</Link></li>
                                <li className={`nav-item ${path === '/user/'+param+'/takeCredit' ? 'active' : ''}`}><Link className='nav-link' onClick={() => setPath('/user/'+param+'/takeCredit')} to={`/user${user.email?'/':''}${param}/takeCredit`}>{language.appLanguage === 'eng' ? 'Loan' : '????????????'}</Link></li>
                                <li className={`nav-item ${path === '/user/'+param+'/review' ? 'active' : ''}`}><Link className='nav-link' onClick={() => setPath('/user/'+param+'/review')} to={`/user${user.email?'/':''}${param}/review`}>{language.appLanguage === 'eng' ? 'Review' : '????????????'}</Link></li>
                                <li className={`nav-item ${path === '/user/logOut' ? 'active' : ''}`}><Link className={`nav-link ${user.email?'':'disabled'}`} onClick={() => { localStorage.removeItem('token'); changeUserRole('guest');changeParam('') }} to={`/guest`}>{language.appLanguage === 'eng' ? 'Log out' : '??????????'}</Link></li>
                            </>) : 
                            (<>
                                <li className={`nav-item ${path === '/admin/'+param ? 'active' : ''}`}><Link className='nav-link' onClick={() => setPath('/admin/'+param)} to={`/admin${user.email?'/':''}${param}`}>{language.appLanguage === 'eng' ? 'Account' : '??????????????'}</Link></li>
                                <li className={`nav-item ${path === '/admin/users' ? 'active' : ''}`}><Link className='nav-link' onClick={() => setPath('/admin/users')} to={`/admin/users`}>{language.appLanguage === 'eng' ? 'Users' : '??????????????????????'}</Link></li>
                                <li className={`nav-item ${path === '/admin/credits' ? 'active' : ''}`}><Link className='nav-link' onClick={() => setPath('/admin/credits')} to={`/admin/credits`}>{language.appLanguage === 'eng' ? 'Credits' : '??????????????'}</Link></li>
                                <li className={`nav-item ${path === '/admin/reviews' ? 'active' : ''}`}><Link className='nav-link' onClick={() => setPath('/admin/reviews')} to={`/admin/reviews`}>{language.appLanguage === 'eng' ? 'Reviews' : '??????????????'}</Link></li>
                                <li className={`nav-item ${path === '/user/logOut' ? 'active' : ''}`}><Link className={`nav-link ${user.email?'':'disabled'}`} onClick={() => { localStorage.removeItem('adminToken'); changeUserRole('guest');changeParam('') }} to={`/guest`}>{language.appLanguage === 'eng' ? 'Log out' : '??????????'}</Link></li>
                            </>) 
                        }
                    </ul>
                </div>
                <ul className="navbar-nav d-none d-md-inline-block">
                    <li className='nav-link' style={{ paddingBottom: '2px' }}>
                        <div className='language-switcher nav-item d-flex align-items-center' onClick={toggleSwitcher}>
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