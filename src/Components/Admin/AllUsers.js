import React, { useEffect, useContext, useState, useRef } from 'react';
import Fade from 'react-reveal/Fade';
import $ from "jquery";
import Proxy from '../../Contexts/Proxy.js';
import AdminUser from './AdminUser';
import AppLanguage from '../../Contexts/AppLanguage.js';
import Pagination from '../Pagination';
import Logo from '../Logo';
import { useAlert } from 'react-alert';
import '../../style/adminAllUsers.css';
import '../../style/button-panel.css';
export default (props) => {
    const { appLanguage } = useContext(AppLanguage);
    const { proxy } = useContext(Proxy);
    const idOfModal = 'adminSendEmail';
    const alert = useAlert();

    const [isSending, setIsSending] = useState(false);
    const [filter, setFilter] = useState('checked');
    const [isBadgeOfUncheckUsers, setIsBadgeOfUncheckUsers] = useState(true);
    const [currentUser, setCurrentUser] = useState('');
    const [currentArray, setCurrentArray] = useState([]);
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
        var img = new Image();
        img.onload = function () {
            canvas.current.width = img.width;
            canvas.current.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.current.width, canvas.current.height);
        };
        img.src = URL.createObjectURL(new Blob([new Uint8Array(passport.data)]));
    }
    async function checkUser(email) {
        fetch(proxy + '/checkUserAgree', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('adminToken')
            },
            body: JSON.stringify({
                'email': email,
            })
        }).then(resp => resp.json()).then(json => {
            if (json.status === 'ok') {
                for (let item of props.notCheckUserArray) {
                    if (item)
                        for (let user of item.data) {
                            if (user.email === email) {
                                let deletedUser = Object.assign({}, user);
                                user.state = 'approved';
                                const currentArrayClone = props.notCheckUserArray.slice();
                                props.changeNotCheckUserArray(currentArrayClone);
                                if (props.checkUserArray[0]) {
                                    let currentArrayClone = props.checkUserArray.slice();
                                    currentArrayClone[0].data.unshift(deletedUser);
                                    props.changeCheckUserArray(currentArrayClone);
                                }
                            }
                        }
                }
                alert.success(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Succes' : 'Успіх'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'User is checked' : 'Користувача підтверджено'}</p></div>);
                closeModalButton.current.click();
            } else {
                alert.error(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Error' : 'Помилка'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'Something was wrong' : "Щось пішло не так"}</p></div>);
            }
        })
    }
    function detectUpdateArrayFunction() {
        switch (currentArray) {
            case props.checkUserArray://Тут все понятно. Якщо це масив чекед юзер то функція оновлення буде для чек юзер. Оновити масив без функції не можна. Інакше не буде рендерінг
                return props.changeCheckUserArray;
            case props.dataNotReadyUserArray:
                return props.changeDataNotReadyUserArray;
            case props.notCheckUserArray:
                return props.changeNotCheckUserArray;
        }
    }
    async function sendEmail() {
        if (textareaOfModal.current.value.length < 10) {
            alert.info(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Info' : 'Інфо'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'Too short email text ' : 'Занадто короткий текст емайлу '}</p></div>);
            return;
        }
        let fetchPath;
        let successMessage;
        switch (scope) {
            case 'delete_photo':
                fetchPath = '/deleteAvatar';
                successMessage = appLanguage === 'eng' ? 'Avatar has been deleted' : 'Аватар успішно видалено';
                break;
            case 'delete_user':
                fetchPath = '/deleteUser';
                successMessage = appLanguage === 'eng' ? 'User has been deleted' : 'Користувача успішно видалено';
                break;
            case 'write_email':
                fetchPath = '/writeEmail';
                successMessage = appLanguage === 'eng' ? 'Email has been sent' : 'Емейл відправлено';
                break;
            case 'not_check_user':
                fetchPath = '/checkUserDisagree';
                successMessage = appLanguage === 'eng' ? 'User not verified' : 'Користувача не підтверджено';
                break;
        }
        setIsSending(true);
        fetch(proxy + fetchPath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('adminToken')
            },
            body: JSON.stringify({
                'email': currentUser,
                'text': textareaOfModal.current.value
            })
        }).then(resp => resp.json()).then(json => {
            setIsSending(false);
            if (json.status === 'ok') {
                switch (scope) {
                    case 'delete_photo':
                        for (let item of currentArray) {
                            if (item)
                                for (let user of item.data) {
                                    if (user.email === currentUser) {
                                        user.avatar = null;
                                        const currentArrayClone = currentArray.slice();
                                        const updateArrayFunction = detectUpdateArrayFunction();
                                        updateArrayFunction(currentArrayClone);
                                    }
                                }
                        }
                        break;
                    case 'delete_user':
                    case 'not_check_user': //При видаленні...
                        let deletedUser;
                        for (let item of currentArray) {//Проходимось по ПОТОЧНОМУ МАСИВІ (ПІДТВЕРДЖЕНІ НЕПІДТВЕРДЖЕНІ НОТРЕДІ)
                            if (item) {//Якщо є дані
                                for (let user of item.data) {
                                    if (user.email === currentUser) {
                                        deletedUser = Object.assign({}, user);
                                        if (scope === 'not_check_user')
                                            user.state = 'unchecked';
                                        else user.state = 'deleted';
                                    }
                                }
                                if (item.lastItem === currentUser) {//Якщо видалили останнього юзера то...
                                    let newLastItem = undefined;
                                    for (let i = item.data.length - 2; i >= 0; i--) {//Проходимся по масиву даних З КІНЦЯ не беручі до уваги останнього юзера
                                        if (!item.data[i].state) {//Находимо першого НЕВИДАЛЕНОГО ЮЗЕРА
                                            newLastItem = item.data[i].email;//І робимо ласт емейл на емейл цього юзера
                                            break;
                                        }
                                    }
                                    if (!newLastItem)//Якщо змінна не помінялась, значить немає більше юзерів (вони всі видалені)
                                        newLastItem = 'noItems';//тоді ласт індекс буде no
                                    item.lastItem = newLastItem;//оновлєюмо саме поле в об'єкті
                                }
                                const currentArrayClone = currentArray.slice();
                                const updateArrayFunction = detectUpdateArrayFunction();
                                updateArrayFunction(currentArrayClone);//використовуємо функцію оновлення описану вище. Параметр це новий масив з зміненими даними. Після цього реакт оновить компоненти
                            }
                        }
                        if (scope === 'not_check_user' && props.dataNotReadyUserArray[0]) {
                            deletedUser.passport = null;
                            let currentArrayClone = props.dataNotReadyUserArray.slice();
                            currentArrayClone[0].data.unshift(deletedUser);
                            props.changeDataNotReadyUserArray(currentArrayClone);
                        }
                        break;
                }
                alert.success(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Succes' : 'Успіх'}</div><p className='alert-text text-nowrap'>{successMessage}</p></div>);
                closeModalButton.current.click();
            } else if (json.status === 'existence credits') {
                alert.info(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Info' : 'Інфо'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'User have not repaid a loans yet' : 'Користувач не погасив всі кредити'}</p></div>);
            } else {
                alert.error(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Error' : 'Помилка'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'Something was wrong' : "Щось пішло не так"}</p></div>);
            }
        });
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
                            <div className='col-12 col-md-6 col-lg-4'><button onClick={() => setFilter('dataNotReady')} className='btn btn-secondary text-nowrap'>{appLanguage === 'eng' ? 'Waiting' : 'Очікуються'}</button></div>
                            <div className='col-12 col-md-6 col-lg-4'><button onClick={() => { setFilter('notChecked'); setTimeout(() => setIsBadgeOfUncheckUsers(false), 2000) }} className='btn btn-danger text-nowrap'>{appLanguage === 'eng' ? 'Not checked' : 'Непідтверджені'}{isBadgeOfUncheckUsers ? <span className="badge badge-pill badge-light">{props.numOfNotCheckUser}</span> : null}</button></div>
                        </div>
                        <div className='container admin-all-users-list not-reveal'>
                            {filter === 'checked' ?
                                <div key='d' >
                                    <Pagination
                                        itemId='email'
                                        fetchBody={{
                                            lastItems: props.checkUserArray.map(value => {
                                                if (value) {
                                                    return value.lastItem;
                                                } else return undefined;
                                            })
                                        }}
                                        fetchHeaders={{ 'Authorization': 'Bearer ' + localStorage.getItem('adminToken') }}
                                        setExternalArray={props.changeCheckUserArray}
                                        externalArray={props.checkUserArray}
                                        render={(userArray) =>
                                            userArray.map((user) => {
                                                return <AdminUser state={user.state} setCurrentArray={() => setCurrentArray(props.checkUserArray)} key={user.email} setPassport={showPassport} passport={user.passport} avatar={user.avatar} changeCurrentUser={changeCurrentUser} changeScope={changeScope} idOfModal={idOfModal} status='Checked' first_name={user.first_name} second_name={user.second_name} email={user.email} phone={user.phone} credit_card={user.credit_card} all_credits={user.all_credits} closed_credits={user.closed_credits} active_credits={user.active_credits} expired_credits={user.expired_credits} />
                                            })
                                        }
                                        numberOfItemsOnPage={props.numOfItemsInPagination}
                                        fetchArray={[proxy + '/getAdminUsersChecked', proxy + '/getAdminUsersAvatarChecked', proxy + '/getAdminUsersPassportChecked']}
                                        totalPages={Math.ceil(props.numOfCheckUser / props.numOfItemsInPagination)}
                                        visiblePages={5}
                                        currentPage={0}
                                        first={appLanguage === 'eng' ? 'First' : 'Початок'}
                                        last={appLanguage === 'eng' ? 'Last' : 'Кінець'}
                                        whiteList={appLanguage === 'eng' ? 'there is no items' : "тут немає об'єктів"}
                                    />
                                </div>
                                : filter === 'dataNotReady' ?
                                    <div key='fg'>
                                        <Pagination
                                            itemId='email'
                                            fetchBody={{
                                                lastItems: props.dataNotReadyUserArray.map(value => {
                                                    if (value) {
                                                        return value.lastItem;
                                                    } else return undefined;
                                                })
                                            }}
                                            fetchHeaders={{ 'Authorization': 'Bearer ' + localStorage.getItem('adminToken') }}
                                            setExternalArray={props.changeDataNotReadyUserArray}
                                            externalArray={props.dataNotReadyUserArray}
                                            render={(userArray) =>
                                                userArray.map((user) => {
                                                    return <AdminUser state={user.state} setCurrentArray={() => setCurrentArray(props.dataNotReadyUserArray)} setPassport={showPassport} key={user._id} avatar={user.avatar} changeCurrentUser={changeCurrentUser} changeScope={changeScope} idOfModal={idOfModal} status='DataNotReady' first_name={user.first_name} second_name={user.second_name} email={user.email} passport={user.passport} phone={user.phone} credit_card={user.credit_card} all_credits={user.all_credits} closed_credits={user.closed_credits} active_credits={user.active_credits} expired_credits={user.expired_credits} />
                                                })
                                            }
                                            numberOfItemsOnPage={props.numOfItemsInPagination}
                                            fetchArray={[proxy + '/getAdminUserNotReady', proxy + '/getAdminUserAvatarNotReady', proxy + '/getAdminUserPassportNotReady']}
                                            totalPages={Math.ceil(props.numOfDataNotReadyUser / props.numOfItemsInPagination)}
                                            visiblePages={5}
                                            currentPage={0}
                                            first={appLanguage === 'eng' ? 'First' : 'Початок'}
                                            last={appLanguage === 'eng' ? 'Last' : 'Кінець'}
                                            whiteList={appLanguage === 'eng' ? 'there is no items' : "тут немає об'єктів"}
                                        />
                                    </div> :
                                    <div key='rfsd'>
                                        <Pagination
                                            itemId='email'
                                            fetchBody={{
                                                lastItems: props.notCheckUserArray.map(value => {
                                                    if (value) {
                                                        return value.lastItem;
                                                    } else return undefined;
                                                })
                                            }}
                                            fetchHeaders={{ 'Authorization': 'Bearer ' + localStorage.getItem('adminToken') }}
                                            setExternalArray={props.changeNotCheckUserArray}
                                            externalArray={props.notCheckUserArray}
                                            render={(userArray) =>
                                                userArray.map((user) => {
                                                    return <AdminUser checkUser={checkUser} state={user.state} setCurrentArray={() => setCurrentArray(props.notCheckUserArray)} setPassport={showPassport} key={user._id} avatar={user.avatar} changeCurrentUser={changeCurrentUser} changeScope={changeScope} idOfModal={idOfModal} status='NotChecked' first_name={user.first_name} second_name={user.second_name} email={user.email} passport={user.passport} phone={user.phone} credit_card={user.credit_card} all_credits='12' all_credits={user.all_credits} closed_credits={user.closed_credits} active_credits={user.active_credits} expired_credits={user.expired_credits} />
                                                })
                                            }
                                            numberOfItemsOnPage={props.numOfItemsInPagination}
                                            fetchArray={[proxy + '/getAdminUserUnchecked', proxy + '/getAdminUsersAvatarUnchecked', proxy + '/getAdminUsersPassportUnchecked']}
                                            totalPages={Math.ceil(props.numOfNotCheckUser / props.numOfItemsInPagination)}
                                            visiblePages={5}
                                            currentPage={0}
                                            first={appLanguage === 'eng' ? 'First' : 'Початок'}
                                            last={appLanguage === 'eng' ? 'Last' : 'Кінець'}
                                            whiteList={appLanguage === 'eng' ? 'there is no items' : "тут немає об'єктів"}
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
                                <button disabled={isSending} onClick={sendEmail} className='btn btn-primary' >
                                    {isSending ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : appLanguage === 'eng' ? 'Send' : 'Відправити'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    )
}
