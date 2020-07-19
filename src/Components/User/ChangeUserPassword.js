import React, { useContext, useRef, useState } from 'react';
import AppLanguage from '../../Contexts/AppLanguage';
import User from '../../Contexts/User';
import Proxy from '../../Contexts/Proxy';
export default (props) => {
    const { appLanguage } = useContext(AppLanguage);
    const { changeUserPassword } = useContext(User);
    const oldPassword = useRef(null);
    const newPassword = useRef(null);
    const {proxy} = useContext(Proxy);
    const [isValidForm, setIsValidForm] = useState(false);
    const [isSendigForm, setIsSendingForm] = useState(false);
    function validatePassword(e) {
        let regex = /^[a-zA-Zа-яА-ЯіїІЇ0-9][a-zA-Zа-яА-Яії0-9]{7,20}$/u;
        if (e.target.value.length !== 0) {
            if (regex.test(e.target.value)) {
                e.target.classList.add('valid');
                e.target.classList.remove('invalid');
            }
            else {
                e.target.classList.add('invalid');
                e.target.classList.remove('valid');
            }
        }
    }
    function returnStateOfField(e) {
        if (e.target.value.length === 0) {
            e.target.classList.remove('valid');
            e.target.classList.remove('invalid');
        }
    }
    function checkAllField() {
        const isValidForm = oldPassword.current.classList.contains('valid') && newPassword.current.classList.contains('valid');
        setIsValidForm(isValidForm);
        return isValidForm;
    }
    function checkForm(e) {
        returnStateOfField(e);
        checkAllField();
    }
    async function submitForm(e) {
        e.preventDefault();
        if (!checkAllField())
            return;
        setIsSendingForm(true);
        let resp = await fetch(proxy + '/updatePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                'old_password': oldPassword.current.value,
                'new_password': newPassword.current.value
            })
        });
        let json = await resp.json();
        console.log(json);
        if (json.status === 'ok') {
            setIsSendingForm(false);
        }
    }
    return (
        <div className='changeUserData'>
            <h3 className='h3 text-dark text-center mb-0 mb-sm-3 change-data-title'>{appLanguage === 'eng' ? 'Change password' : "Змінити пароль"}</h3>
            <form onSubmit={submitForm}>
                <div className="form-group row mb-1 mb-sm-3">
                    <label htmlFor="changeUserOldPassword" className=' text-nowrap col-sm-3 col-form-label text-left text-sm-right'>{appLanguage === 'eng' ? 'Old pass' : "Старий пароль"}</label>
                    <div className='col-sm-6 col-md-9 d-flex align-items-center'>
                        <input ref={oldPassword} type="password" name='old_password' className="form-control" id='changeUserOldPassword' onChange={(e) => { validatePassword(e); checkForm(e) }} />
                    </div>
                </div>
                <div className="form-group row mb-1 mb-sm-3">
                    <label htmlFor="changeUserNewPassword" className=' text-nowrap col-sm-3 col-form-label pb-1 pb-sm-2 text-left text-sm-right'>{appLanguage === 'eng' ? 'New pass' : "Новий пароль"}</label>
                    <div className='col-sm-6 col-md-9 d-flex align-items-center'>
                        <input ref={newPassword} type="password" name='new_password' className="form-control" id='changeUserNewPassword' onChange={(e) => { validatePassword(e); checkForm(e) }} />
                    </div>
                </div>
                <div className='d-flex justify-content-end  justify-content-sm-center justify-content-md-end'>
                    <button type="submit" disabled={!isValidForm || isSendigForm} className="btn btn-secondary">{isSendigForm ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : appLanguage === 'eng' ? 'Submit' : 'Відправити'}</button>
                </div>
            </form>
        </div>
    )
}