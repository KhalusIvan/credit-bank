import React, { useEffect, useContext } from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { throttle } from '../../script/custom.js';
import User from '../../Contexts/User';
export default (props) => {
    const navList = props.navList;
    const activeElement = props.activeElement;
    const toogleActive = props.toogleActive;
    const {user} = useContext(User);
    useEffect(() => {
        if (user.role === 'guest') {
            function toogleActiveAnchor() {
                const y = document.querySelector('header').offsetHeight + 10;
                const elementBehindHeader = document.elementFromPoint(0, y).closest('[id].anchor');
                const idOfLink = elementBehindHeader.getAttribute('id');
                toogleActive(document.querySelector(`.nav-item a[href='/guest#${idOfLink}']`))
            }
            toogleActiveAnchor = throttle(toogleActiveAnchor, 500);
            toogleActiveAnchor();
            window.addEventListener('scroll', toogleActiveAnchor);
            return () =>window.removeEventListener('scroll', toogleActiveAnchor);
        }
    },[user.role,toogleActive])
    return (
        <>
            {navList.map((object, index) =>
                <li key={object.label} className={`nav-item ${index === navList.length - 1 ? 'last-child' : ''}`} ref={index === 0 ? activeElement : null}>
                    <NavLink to={object.href} onClick={(e) => {toogleActive(e.target) }} className='nav-link' activeClassName='n' scroll={el => props.scrollWithOffset(el, document.documentElement.clientWidth <= 767 ? 0 : document.querySelector('header').offsetHeight)}>{object.label}</NavLink>
                </li>
            )}
        </>
    )
}