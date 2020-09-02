import React, { useContext } from 'react';
import {
    useParams
} from "react-router-dom";
import AppLanguage from '../Contexts/AppLanguage';
export default function ConfirmEmail() {
    const {email} = useParams();
    const appLanguage = useContext(AppLanguage);
    let data = '';
    if(localStorage.getItem('token'))
        data = appLanguage === 'eng' ? 'Your account is already checked' : 'Ваш аккаунт вже підтверджено';
    else
        data = (appLanguage === 'eng' ? 'Instructions for verifying email sent to ' : 'Інструкція для підтвердження емейлу відправлено на ') + email;
    return (<div className='tokenPage'>
        <h1 className={`token-title text-center`}>{data}</h1>
    </div>)
}