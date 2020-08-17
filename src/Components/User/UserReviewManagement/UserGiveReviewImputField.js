import React, { useContext, useState, useEffect } from 'react';
import AppLanguage from '../../../Contexts/AppLanguage';
import Proxy from '../../../Contexts/Proxy.js'
import User from '../../../Contexts/User.js';
import { useAlert } from 'react-alert'
import '../../../style/userGiveReview.css'
export default (props) => {
    const alert = useAlert();
    const { appLanguage } = useContext(AppLanguage);
    const { proxy } = useContext(Proxy);
    const { user } = useContext(User);
    const [typedSimbols, setTypedSimbols] = useState(0);
    const [imputValue, setImputValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const maxSimbols = 350;
    function valueHandler(e) {
        if (e.target.value.length > maxSimbols)
            return;
        setImputValue(e.target.value);
        setTypedSimbols(e.target.value.length);
    }
    useEffect(() => {
        setIsValid(imputValue.length > 2);
    }, [imputValue.length]);
    async function submitNewReview(e) {
        e.preventDefault();
        setIsSending(true);
        console.log(user);
        let formData = new FormData();
        formData.append('name', user['first_name'] + " " + user['second_name']);
        if (user.avatar)
            formData.append("file", new Blob([new Uint8Array(user.avatar.data)]), "image.png");
        else
            formData.append("file", new Blob([]), "image.png");
        formData.append('text', imputValue);
        let res = await fetch(proxy + '/setComment', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: formData
        });
        let json = await res.json();
        console.log(json);
        if (json.status === 'limit') {
            alert.error(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Error' : 'Помилка'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'The maximum number of comments is 4' : 'Максимальна кількість коментарів - 4'}</p></div>);
        }
        else {
            alert.success(<div><div className='alert-title'>{appLanguage === 'eng' ?  'Succes' : 'Успіх'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'You added comment' : 'Ви додали коментар'}</p></div>);
            props.addReview(json);
            setTypedSimbols(0);
            setImputValue('');
        }
        setIsSending(false);
    }
    return (
        <div className='container row m-0 give-review pb-3'>
            <form className='col-12 mt-1 mb-1 mt-md-3 mb-md-2 p-2 col-md-6 col-lg-5' onSubmit={submitNewReview}>
                <div className="form-group m-0">
                    <label htmlFor="reviewImput"><h2 className='give-review-title'>{appLanguage === 'eng' ? 'Give review' : 'Залишити відгук'}</h2></label>
                    <textarea disabled={isSending} value={imputValue} onChange={valueHandler} className="form-control give-review-imput-field mb-1" id="reviewImput" rows="4"></textarea>
                    <small className='text-muted'>{appLanguage === 'eng' ? `You have entered ${typedSimbols} characters out of ${maxSimbols} possible` : `Ви ввели ${typedSimbols} символа з ${maxSimbols} можливих`}</small>
                </div>
                <div className='d-flex justify-content-end'>
                    <button type="submit" disabled={!isValid || isSending} className="btn btn-secondary send-new-review">{isSending ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Send'}</button>
                </div>
            </form>
            <div className='col-12 col-md-6 col-lg-7 mt-1 mb-1 mt-md-3 mb-md-2 align-items-center d-flex p-2 review-recomendation text-muted'>
                {appLanguage === 'eng' ? 'Write a short review about our service. What are our good and possibly bad qualities, in your opinion, and publish. Remember that all users and administrators will see your feedback.' : "Напишіть короткий відгук про наш сервіс. Які наші хороші та, можливо, погані якості, на вашу думку, і опублікуйте це. Пам'ятайте, що всі користувачі та адміністратори побачать ваш відгук."}
            </div>
        </div>
    )
}