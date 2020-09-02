import React, { useContext, useRef, useState } from 'react';
import AppLanguage from '../../Contexts/AppLanguage.js';
import Proxy from '../../Contexts/Proxy.js';
import { withRouter } from 'react-router-dom';
import User from '../../Contexts/User.js';
import { useAlert } from 'react-alert'
export default withRouter(props => {
    const alert = useAlert();
    const appLanguage = useContext(AppLanguage).appLanguage;
    const { proxy } = useContext(Proxy);
    const { changeUserRole } = useContext(User);
    const email = useRef(null);
    const password = useRef(null);
    const invalidLabel = useRef(false);
    const [isSending, setIsSending] = useState(false);
    const [isValidForm, setIsValidForm] = useState(false);
    const [isForget, setIsForget] = useState(false);
    async function signIn(e) {
        e.preventDefault();
        setIsSending(true);
        let resp = await fetch(proxy + '/signIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.current.value,
                password: password.current.value
            })
        })
        let json = await resp.json();
        if (json.role === 'admin') {
            props.onSubmitFunction();
            localStorage.setItem('adminToken', await json.token);
            changeUserRole('admin');
            props.history.push('/admin');
        }
        else if (json.role === 'user') {
            props.onSubmitFunction();
            localStorage.setItem('token', await json.token);
            changeUserRole('user');
            props.history.push('/user');
        }
        else if (json.status === 'error') {
            invalidLabel.current.classList.add('d-inline-block');
        }
        setIsSending(false);
    }
    async function sendForget(e) {
        e.preventDefault();
        setIsSending(true);
        const resp = await fetch(proxy + '/resetPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email.current.value,
                'lang': appLanguage
            })
        });
        const json = await resp.json();
        setIsSending(false);
        if (json.status === 'ok') {
            props.onSubmitFunction();
            alert.info(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Info' : 'Інфо'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'Your new password was sent on ' : 'Ваш новий пароль відправлено на '}{email.current.value}</p></div>);
        }
        if(json.status === 'error'){
            alert.error(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Error' : 'Помилка'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'Error to change the password. Try again later' : 'Помилка при зміні паролю. Спробуйте пізніше'}</p></div>);
        }
    }
    function checkAllField() {
        const isValidForm = email.current.value.length > 0 && password.current.value.length > 0;
        setIsValidForm(isValidForm);
    }
    function forgetPassword() {
        setIsForget(true);
    }
    function validateEmail(e) {
        let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (e.target.value.length !== 0) {
            setIsValidForm(regex.test(e.target.value))
        }
    }
    return (
        <>
            <form onSubmit={isForget ? sendForget : signIn}>
                <div className="form-group text-center">
                    <label ref={invalidLabel} className='text-danger d-none'>{appLanguage === 'eng' ? "Invalid login or password" : 'Неправильний логін або пароль'}</label>
                    <input onChange={isForget ? validateEmail : checkAllField} ref={email} type="text" className="form-control" placeholder={appLanguage === 'eng' ? "Email" : 'Емейл'} name='email' />
                </div>
                <div className={`input-group mb-2 ${isForget ? 'd-none' : ''}`}>
                    <input onChange={isForget ? () => { } : checkAllField} ref={password} type="password" className="form-control" name='password' placeholder={appLanguage === 'eng' ? "Password" : 'Пароль'} />
                </div>
                <div className='d-flex justify-content-between'>
                    <div className={`forget-password ${isForget ? 'd-none' : ''}`}><button data-target='#forget' data-toggle='modal' onClick={forgetPassword} type="button" className='btn btn-link p-0'>{appLanguage === 'eng' ? 'Forget password?' : 'Забули пароль?'}</button></div>
                    <button disabled={!isValidForm || isSending} type="submit" className={`btn btn-dark ml-auto`}>{isSending ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : appLanguage === 'eng' ? "Submit" : 'Відправити'}</button>
                </div>
            </form>
        </>
    )
})
