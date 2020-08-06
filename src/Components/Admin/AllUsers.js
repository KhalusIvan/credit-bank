import React, { Suspense, useEffect, useContext, lazy, useState, useRef } from 'react';
import Fade from 'react-reveal/Fade';
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
import Zoom from 'react-reveal/Zoom';
import AdminUser from './AdminUser';
import AppLanguage from '../../Contexts/AppLanguage.js';
import Logo from '../Logo';
import '../../style/adminAllUsers.css';
import '../../style/button-panel.css';
export default (props) => {
    const { appLanguage } = useContext(AppLanguage);
    const idOfModal = 'adminSendEmail';
    const [filter, setFilter] = useState('all');
    const [currentUser, setCurrentUser] = useState('');
    const [scope, setScope] = useState('');
    function changeCurrentUser(newUser) {
        setCurrentUser(newUser);
    }
    function changeScope(newScope) {
        setScope(newScope);
    }
    const closeModalButton = useRef(null);
    return (
        <Fade>
            <div className='container-fluid p-0 admin-all-users-wrapper'>
                <div className='container p-0 admin-all-users'>
                    <div className="jumbotron p-1 p-xm-2 p-sm-4 p-lg-5 m-0 rounded-0 bg-transparent">
                        <h2 className='text-center p-sm-3 p-1 m-0 mb-sm-2 user-my-credits title'>{appLanguage === 'eng' ? 'Users' : 'Користувачі'}</h2>
                        <div className='button-panel row justify-content-center'>
                            <div className='col-12 col-md-6 col-lg-4'><button onClick={() => setFilter('all')} className='btn btn-secondary text-nowrap'>{appLanguage === 'eng' ? 'All' : 'Всі'}</button></div>
                            <div className='col-12 col-md-6 col-lg-4'><button onClick={() => setFilter('checked')} className='btn btn-primary text-nowrap'>{appLanguage === 'eng' ? 'Checked' : 'Підтверджені'}</button></div>
                            <div className='col-12 col-md-6 col-lg-4'><button onClick={() => setFilter('notChecked')} className='btn btn-danger text-nowrap'>{appLanguage === 'eng' ? 'Not checked' : 'Непідтверджені'}</button></div>
                        </div>
                        <div className='container admin-all-users-list not-reveal'>
                            <AdminUser changeCurrentUser={changeCurrentUser} changeScope={changeScope} idOfModal={idOfModal} status='Checked' first_name='Bogdan' second_name='Seredenko' email='seredenko99@gmail.com' phone='+380966580473' credit_card='5565345654356543' all_credits='12' closed_credits='9' active_credits='3' expired_credits='0' />
                            <AdminUser changeCurrentUser={changeCurrentUser} changeScope={changeScope} idOfModal={idOfModal} status='Checked' first_name='Bogdan' second_name='Seredenko' email='seredo99@gmail.com' phone='+380966580473' credit_card='5565345654356543' all_credits='12' closed_credits='9' active_credits='3' expired_credits='0' />
                            <AdminUser changeCurrentUser={changeCurrentUser} changeScope={changeScope} idOfModal={idOfModal} status='Checked' first_name='Bogdan' second_name='Seredenko' email='sernko99@gmail.com' phone='+380966580473' credit_card='5565345654356543' all_credits='12' closed_credits='9' active_credits='3' expired_credits='0' />
                        </div>
                    </div>
                </div>
                <div className="modal fade signForm p-0 pay-credit" id={idOfModal} tabIndex="-1" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <Logo />
                                <button ref={closeModalButton} type="button" className="close p-0 mt-1" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            {currentUser ?
                                <div className='modal-body text-center'>
                                    <h3 className='admin-all-users-scope-title'>{
                                        scope === 'delete_photo' ? appLanguage === 'eng' ? 'Why do you want to remove photo?' : 'Чому ви хочете видалити фото?' :
                                        scope === 'delete_user' ? appLanguage === 'eng' ? 'Why do you want to delete user?' : 'Чому ви хочете видалити користувача?' :
                                        scope === 'write_email' ? appLanguage === 'eng' ? 'Type your message' : 'Напишіть ваше повідомлення' : ''
                                    }</h3>
                                </div> : ''
                            }
                            <div className='modal-footer'>
                                <button className='btn btn-primary' >{appLanguage === 'eng' ? 'Send' : ' Відправити'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    )
}
