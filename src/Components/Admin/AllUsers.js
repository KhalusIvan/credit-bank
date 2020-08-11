import React, { useEffect, useContext, useState, useRef } from 'react';
import Fade from 'react-reveal/Fade';
import $ from "jquery";
import Proxy from '../../Contexts/Proxy.js';
import AdminUser from './AdminUser';
import AppLanguage from '../../Contexts/AppLanguage.js';
import Pagination from '../Pagination';
import Logo from '../Logo';
import '../../style/adminAllUsers.css';
import '../../style/button-panel.css';
export default (props) => {
    const { appLanguage } = useContext(AppLanguage);
    const { proxy } = useContext(Proxy);
    const idOfModal = 'adminSendEmail';
    const [filter, setFilter] = useState('checked');
    const [isBadgeOfUncheckUsers, setIsBadgeOfUncheckUsers] = useState(true);
    const [currentUser, setCurrentUser] = useState('');
    const [scope, setScope] = useState('');
    const closeModalButton = useRef(null);
    const textareaOfModal = useRef(null);
    const canvas = useRef(null);
    function changeCurrentUser(newUser) {
        setCurrentUser(newUser);
    }
    function changeScope(newScope) {
        setScope(newScope);
    }
    function showPassport(passport) {
        if (!passport) {
            return;
        }
        var ctx = canvas.current.getContext('2d');
        var img = new Image;
        img.onload = function () {
            canvas.current.width = img.width;
            canvas.current.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.current.width, canvas.current.height);
        };
        img.src = URL.createObjectURL(new Blob([new Uint8Array(passport.data)]));
    }
    async function sendEmail() {
        if (textareaOfModal.current.value.length < 10) {
            return;
        }
        switch (scope) {
            case 'delete_photo':
                console.log('delete ' + currentUser);
                break;
            case 'delete_user':
                console.log('user ' + currentUser);
                break;
            case 'write_email':
                console.log('write ' + currentUser);
                break;
            case 'not_check_user':
                console.log('passport' + currentUser);
                break;
        }
    }
    useEffect(() => {
        $('#' + idOfModal).on('hidden.bs.modal', function (e) {
            if (textareaOfModal.current)
                textareaOfModal.current.value = '';
        })
    }, []);
    return (
        <Fade>
            <div className='container-fluid p-0 admin-all-users-wrapper'>
                <div className='container p-0 admin-all-users'>
                    <div className="jumbotron p-1 p-xm-2 p-sm-4 p-lg-5 m-0 rounded-0 bg-transparent">
                        <h2 className='text-center p-sm-3 p-1 m-0 mb-sm-2 admin-all-users-title title'>{appLanguage === 'eng' ? 'Users' : 'Користувачі'}</h2>
                        <div className='button-panel row justify-content-center'>
                            <div className='col-12 col-md-6 col-lg-4'><button onClick={() => setFilter('checked')} className='btn btn-primary text-nowrap'>{appLanguage === 'eng' ? 'Checked' : 'Підтверджені'}</button></div>
                            <div className='col-12 col-md-6 col-lg-4'><button onClick={() => {setFilter('notChecked'); setTimeout(()=>setIsBadgeOfUncheckUsers(false),2000)}} className='btn btn-danger text-nowrap'>{appLanguage === 'eng' ? 'Not checked' : 'Непідтверджені'}{isBadgeOfUncheckUsers ? <span className="badge badge-pill badge-light">+{props.numOfNotCheckUser}</span> : null}</button></div>
                        </div>
                        <div className='container admin-all-users-list not-reveal'>
                            {filter === 'checked' ?
                                <div key='d' >
                                    <Pagination setExternalArray={props.changeCheckUserArray} externalArray={props.checkUserArray} token={localStorage.getItem('token')} render={(userArray) =>
                                        userArray.map((user) => {
                                            return <AdminUser key={user.email} avatar={user.avatar} changeCurrentUser={changeCurrentUser} changeScope={changeScope} idOfModal={idOfModal} status='Checked' first_name={user.first_name} second_name={user.second_name} email={user.email} phone={user.phone} credit_card={user.credit_card} all_credits='12' closed_credits='9' active_credits='3' expired_credits='0' />
                                        })
                                    } numberOfItemsOnPage={props.numOfItemsInPagination} fetchArray={[proxy + '/getAdminUsersChecked', proxy + '/getAdminUsersAvatarChecked']} totalPages={Math.ceil(props.numOfCheckUser / props.numOfItemsInPagination)} visiblePages={5} currentPage={0} first={appLanguage === 'eng' ? 'First' : 'Початок'} last={appLanguage === 'eng' ? 'Last' : 'Кінець'}
                                    />
                                </div>
                                :
                                <div key='rfsd'>
                                    <Pagination setExternalArray={props.changeNotCheckUserArray} externalArray={props.notCheckUserArray} token={localStorage.getItem('token')} render={(userArray) =>
                                        userArray.map((user) => {
                                            return <AdminUser setPassport={showPassport} key={user._id} avatar={user.avatar} changeCurrentUser={changeCurrentUser} changeScope={changeScope} idOfModal={idOfModal} status='NotChecked' first_name={user.first_name} second_name={user.second_name} email={user.email} passport={user.passport} phone={user.phone} credit_card={user.credit_card} all_credits='12' closed_credits='9' active_credits='3' expired_credits='0' />
                                        })
                                    } numberOfItemsOnPage={props.numOfItemsInPagination} fetchArray={[proxy + '/getAdminUserUnchecked', proxy + '/getAdminUsersAvatarUnchecked', proxy + '/getAdminUsersPassportUnchecked']} totalPages={Math.ceil(props.numOfNotCheckUser / props.numOfItemsInPagination)} visiblePages={5} currentPage={0} first={appLanguage === 'eng' ? 'First' : 'Початок'} last={appLanguage === 'eng' ? 'Last' : 'Кінець'}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className={`modal fade signForm p-0 user-fall-back ${scope === 'show_passport' ? 'show-passport' : ''}`} id={idOfModal} tabIndex="-1" role="dialog">
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
                                                scope === 'write_email' ? appLanguage === 'eng' ? 'Type your message' : 'Напишіть ваше повідомлення' :
                                                    scope === 'not_check_user' ? appLanguage === 'eng' ? 'Why do you want to refute data?' : 'Чому ви хочете спростувати дані?' :
                                                        scope === 'not_passport' ? appLanguage === 'eng' ? 'User don`t load passport' : 'Коористувач не заватражив паспорт' : ''

                                    }</h3>
                                    {scope !== 'show_passport' ? <>
                                        <div className='form-group'>
                                            <textarea style={{ resize: 'none' }} className='user-fall-back-textarea form-control p-1 p-sm-2 p-md-3 rounded' rows='8' ref={textareaOfModal}></textarea>
                                        </div>
                                        <div className='info text-muted'>
                                            {appLanguage === 'eng' ? 'Your message will be sent to ' : 'Ваше повідомлення буде надіслено на адрес '}{currentUser}
                                        </div></> : ''
                                    }
                                </div> : ''
                            }
                            <div className={`passport-preview ${scope === 'show_passport' ? '' : 'd-none'}`}>
                                <canvas style={{ display: 'block', width: '100%' }} ref={canvas}></canvas>
                            </div>
                            <div className={`modal-footer ${scope === 'show_passport' ? 'd-none' : ''}`}>
                                <button onClick={sendEmail} className='btn btn-primary' >{appLanguage === 'eng' ? 'Send' : ' Відправити'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    )
}
