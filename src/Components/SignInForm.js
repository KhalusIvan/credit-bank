import React, { useContext, useRef, useState } from 'react';
import AppLanguage from '../Contexts/AppLanguage.js';
import Proxy from '../Contexts/Proxy.js';
import { withRouter } from 'react-router-dom';
import User from '../Contexts/User.js';
export default withRouter(props =>{
    const appLanguage = useContext(AppLanguage).appLanguage;
    const { proxy } = useContext(Proxy);
    const {changeUserRole,user} = useContext(User);
    const email = useRef(null);
    const password = useRef(null);
    const invalidLabel = useRef(false);
    const [isSending, setIsSending] = useState(false);
    const [isValidForm, setIsValidForm] = useState(false);
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
        console.log(json);
        if(json.role === 'admin'){
            props.onSubmitFunction();
            changeUserRole('admin');
            props.history.push('/admin');
        }
        else if (json.role === 'user') {
            localStorage.setItem('token', await json.token);
            document.location.reload();
        }
        else if (json.status === 'error') {
            invalidLabel.current.classList.add('d-inline-block');
            setIsSending(false);
        }
    }
    function checkAllField() {
        const isValidForm = email.current.value.length > 0 && password.current.value.length > 0;
        setIsValidForm(isValidForm);
    }
    return (
        <form onSubmit={signIn}>
            <div className="form-group text-center">
                <label ref={invalidLabel} className='text-danger d-none'>{appLanguage === 'eng' ? "Invalid login or password" : 'Неправильний логін або пароль'}</label>
                <input onChange={checkAllField} ref={email} type="text" className="form-control" placeholder={appLanguage === 'eng' ? "Email" : 'Емейл'} name='email' />
            </div>
            <div className="input-group">
                <input onChange={checkAllField} ref={password} type="password" className="form-control" name='password' placeholder={appLanguage === 'eng' ? "Password" : 'Пароль'} />
            </div>
            <div className='d-flex justify-content-end'>
                <button disabled={!isValidForm || isSending} type="submit" className="btn btn-dark ml-auto">{isSending ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : appLanguage === 'eng' ? "Submit" : 'Відправити'}</button>
            </div>
        </form>
    )
})
