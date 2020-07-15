import React, { useContext, Suspense, useRef, useState } from 'react';
import AppLanguage from '../Contexts/AppLanguage';
import Spiner from './Spiner';
import '../style/userGiveReview.css'
export default (props) => {
    const { appLanguage } = useContext(AppLanguage);
    const [typedSimbols, setTypedSimbols] = useState(0);
    const [imputValue, setImputValue] = useState('');
    const maxSimbols = 350;
    const imputField = useRef(null);
    function valueHandler(e) {
        if(e.target.value.length > maxSimbols)
            return;
        setImputValue(e.target.value);
        setTypedSimbols(e.target.value.length);
    }
    return (
        <div className='container row m-0 give-review pb-3'>
            <form className='col-12   mt-1 mb-1 mt-md-3 mb-md-2 p-2 col-md-6 col-lg-5' >
                <div className="form-group m-0">
                    <label htmlFor="reviewImput"><h2 className='give-review-title'>{appLanguage === 'eng' ? 'Give review' : 'Залишити відгук'}</h2></label>
                    <textarea value={imputValue} ref={imputField} onChange={valueHandler} className="form-control give-review-imput-field mb-1" id="reviewImput" rows="4"></textarea>
                    <small className='text-muted'>{appLanguage === 'eng' ? `You have entered ${typedSimbols} characters out of ${maxSimbols} possible` : `Ви ввели ${typedSimbols} символа з ${maxSimbols} можливих`}</small>
                </div>
                <div className='d-flex justify-content-end'>
                    <button type="submit" className="btn btn-secondary send-new-review">{appLanguage === 'eng' ? 'Submit' : "Відправити"}</button>
                </div>
            </form>
            <div className='col-12 col-md-6 col-lg-7 mt-1 mb-1 mt-md-3 mb-md-2 align-items-center d-flex p-2 review-recomendation text-muted'>
                {appLanguage === 'eng' ? 'Write a short review about our service. What are our good and possibly bad qualities, in your opinion, and publish. Remember that all users and administrators will see your feedback.' : "Напишіть короткий відгук про наш сервіс. Які наші хороші та, можливо, погані якості, на вашу думку, і опублікуйте це. Пам'ятайте, що всі користувачі та адміністратори побачать ваш відгук."}
            </div>
        </div>
    )
}