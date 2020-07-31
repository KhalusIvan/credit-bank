import React, { useContext, useRef, useState } from 'react';
import AppLanguage from '../../../Contexts/AppLanguage';
import User from '../../../Contexts/User';
import Proxy from '../../../Contexts/Proxy';
export default (props) => {
    const { appLanguage } = useContext(AppLanguage);
    const { changeUserCreditCard, changeUserPhone } = useContext(User);
    const { proxy } = useContext(Proxy);

    const [creditValue, setCreditValue] = useState('');
    const [phoneValue, setPhoneValue] = useState('');

    const [isValidCreditCard, setIsValidCreditCard] = useState(false);
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);

    const [isSendingCredit, setIsSendingCredit] = useState(false);
    const [isSendingPhone, setIsSendingPhone] = useState(false);

    function handleCreditValue(e) {
        if (inputOnlyNumbers(e.target.value) && e.target.value.length <= 16)
            setCreditValue(e.target.value);
    }
    function handlePhoneValue(e) {
        if (inputOnlyNumbers(e.target.value) && e.target.value.length <= 9)
            setPhoneValue(e.target.value);
    }

    function inputOnlyNumbers(text) {
        return /^\d*$/.test(text);
    }
    async function sendCreditCard() {
        if (!inputOnlyNumbers(creditValue))
            return;
        setIsSendingCredit(true);
        let resp = await fetch(proxy + '/updateCreditCard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "credit_card": creditValue,
            })
        });
        let json = await resp.json();
        if (json.status === 'ok') {
            setIsSendingCredit(false);
            setCreditValue('');
            setIsValidCreditCard(false);
            changeUserCreditCard(creditValue);
        }
    }
    async function sendPhone() {
        if (!inputOnlyNumbers(phoneValue))
            return;
        setIsSendingPhone(true);
        let resp = await fetch(proxy + '/updatePhone', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "phone": "+380" + phoneValue,
            })
        });
        let json = await resp.json();
        if (json.status === 'ok') {
            setIsSendingPhone(false);
            setPhoneValue('');
            setIsValidPhoneNumber(false);
            changeUserPhone('+380' + phoneValue);
        }
    }
    return (
        <div className='changeUserData'>
            <h3 className='h3 text-dark text-center mb-0 mb-sm-3 change-data-title'>{appLanguage === 'eng' ? 'Change credit data' : "Змінити кредитні дані"}</h3>
            <form>
                <div className="form-group row mb-1 mb-sm-3">
                    <label htmlFor="changeUserCreditData" className='text-nowrap col-sm-3 col-form-label text-left text-sm-right'>{appLanguage === 'eng' ? 'Card number' : "Номер картки"}</label>
                    <div className='input-group col-sm-6 col-md-9 d-flex align-items-center'>
                        <input autoComplete="off" onChange={(e) => { handleCreditValue(e); setIsValidCreditCard(e.target.value.length >= 16); }} value={creditValue} type="text" className="form-control" id="changeUserCreditData" />
                        <div className="input-group-append w-25" style={{ height: '100%' }}>
                            <button disabled={!isValidCreditCard || isSendingCredit} onClick={sendCreditCard} className="btn btn-secondary btn-checked m-0 w-100" type="button">{isSendingCredit ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : '✔'}</button>
                        </div>
                    </div>
                </div>
                <div className="form-group row mb-1 mb-sm-3">
                    <label htmlFor="changeUserPhone" className='text-nowrap col-sm-3 col-form-label text-left text-sm-right'>{appLanguage === 'eng' ? 'Phone number' : "Номер телефону"}</label>
                    <div className='input-group col-sm-6 col-md-9 d-flex align-items-center'>
                        <div className="input-group-prepend" style={{height:'100%'}}>
                            <span className={`input-group-text `} style={{padding:'4px 8px',fontSize:'1em'}}>+380</span>
                        </div>
                        <input autoComplete="off" id='changeUserPhone'  value={phoneValue} onChange={(e) => { handlePhoneValue(e); setIsValidPhoneNumber(e.target.value.length >= 9); }} type="text" className="form-control" />
                        <div className="input-group-append w-25" style={{height:'100%'}}>
                            <button disabled={!isValidPhoneNumber || isSendingPhone} onClick={sendPhone} className="btn btn-secondary  btn-checked m-0 w-100" type="button">{isSendingPhone ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : appLanguage === 'eng' ? 'Send' : '✔'}</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
{/* <form>
                <div className="form-group row mb-1 mb-sm-3">
                    <label htmlFor="changeUserCreditData" className='text-nowrap col-sm-3 col-form-label text-left text-sm-right'>{appLanguage === 'eng' ? 'Card number' : "Номер картки"}</label>
                    <div className='col-sm-6 col-md-9 d-flex align-items-center'>
                        <input autoComplete='off' onChange={(e) => { handleCreditValue(e); setIsValidCreditCard(e.target.value.length >= 16); }} value={creditValue} type="text" className="form-control" id="changeUserCreditData" />
                    </div>
                </div>
                <div className='d-flex justify-content-end  justify-content-sm-center justify-content-md-end'>
                    <button disabled={!isValidCreditCard || isSendingCredit} onClick={sendCreditCard} className="btn btn-secondary" type="button">{isSendingCredit ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : appLanguage === 'eng' ? 'Send' : 'Відправити'}</button>
                </div>
            </form> */}