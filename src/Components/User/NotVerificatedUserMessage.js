import React, { useContext, useRef, useState } from 'react';
import '../../style/NotVerificatedUserMessage.css';
import User from '../../Contexts/User';
import Proxy from '../../Contexts/Proxy'
import AppLanguage from '../../Contexts/AppLanguage';
import Zoom from 'react-reveal/Zoom';
export default (props) => {
    const { appLanguage } = useContext(AppLanguage);
    const { user,changeUserPassport, changeUserCreditCard, changeUserPhone } = useContext(User);
    const {proxy} = useContext(Proxy);
    const passportLoader = useRef(null);

    const [isValidFile, setIsValidFile] = useState(false);
    const [isValidCreditCard, setIsValidCreditCard] = useState(false);
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);

    const [isSendingFile,setIsSendingFile] = useState(false);
    const [isSendingCredit,setIsSendingCredit] = useState(false);
    const [isSendingPhone,setIsSendingPhone] = useState(false);

    const [startAnimationFile,setStartAnimationFile] = useState(false);
    const [startAnimationCredit,setStartAnimationCredit] = useState(false);
    const [startAnimationPhone,setStartAnimationPhone] = useState(false);

    
    const [creditValue, setCreditValue] = useState('');
    const [phoneValue, setPhoneValue] = useState('');
    const [fileLabel, setFileLabel] = useState(null);

    function changeFile(e) {
        setFileLabel(e.target.files[0].name);
        setIsValidFile(true);
    }
    function inputOnlyNumbers(text) {
        return /^\d*$/.test(text);
    }
    function handleCreditValue(e) {
        if (inputOnlyNumbers(e.target.value) && e.target.value.length <= 16)
            setCreditValue(e.target.value);
    }
    function handlePhoneValue(e) {
        if (inputOnlyNumbers(e.target.value) && e.target.value.length <= 9)
            setPhoneValue(e.target.value);
    }
    async function sendPassport(){
        setIsSendingFile(true);
        let formData =  new FormData();
        console.log( passportLoader.current.files[0]);
        formData.append("file", passportLoader.current.files[0], "image.png");
        let response = await fetch(proxy+'/updatePassport', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: formData
        });
        let result = await response.json();
        if(result.status === 'ok'){
            changeUserPassport(passportLoader.current.files[0].name);
            setStartAnimationFile(true);
            setIsSendingFile(false);
        }
    }
    async function sendCreditCard() {
        if(!inputOnlyNumbers(creditValue))
            return;
        setIsSendingCredit(true);
        let resp = await fetch(proxy+'/updateCreditCard', {
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
        if(json.status === 'ok'){
            setIsSendingCredit(false);
            setStartAnimationCredit(true);
            changeUserCreditCard(creditValue);
        }
    }
    async function sendPhone() {
        if(!inputOnlyNumbers(phoneValue))
            return;
        setIsSendingPhone(true);
        let resp = await fetch(proxy+'/updatePhone', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "phone": "+380"+phoneValue,
            })
        });
        let json = await resp.json();
        if(json.status === 'ok'){
            setIsSendingPhone(false);
            setStartAnimationPhone(true);
            changeUserPhone('+380' + phoneValue);
        }
    }
    return (
        <div className='container-fluid p-0 not-verificated-user-wrapper'>
            <div className='container  not-verificated-user p-3'>
                <p className={`not-verificated-user-titile text-center`}>{ !user['credit_card'] && !user.passport &&  !user.phone ?
                    appLanguage === 'eng' ? `To take a loan you need to confirm your ${user.passport ? '' : 'passport'} ${user.phone ? '' : 'phone'} ${user['credit_card'] ? '' : 'credit card'}` : `Щоб взяти кредит вам залишилося підтвердити ${user.passport ? '' : 'паспорт'} ${user.phone ? '' : 'телефон'} ${user['credit_card'] ? '' : 'кредитну карту'}`:
                    appLanguage === 'eng' ? 'You will be able to take a loan after the service administrator checks your data' : 'Ви зможете брати кредит після того, як адміністратор сервісу перевірить ваші дані'
                }</p>
                <div className={`form-inline ${user.passport && user.phone && user['credit_card'] ? 'd-none' : ''}`}>
                    <div className='d-flex justify-content-center w-100 align-items-center flex-column flex-lg-row'>
                    <Zoom timeout={500}  when={!startAnimationFile}>
                        <div className={`input-group m-2 ${user.passport ? 'd-none' : ''}`}>
                            <div className="custom-file">
                                <input ref={passportLoader} onChange={changeFile} style={{ cursor: 'pointer' }} type="file" name="picture" className="fileLoader custom-file-input" id="passportLoader" accept="image/*"></input>
                                <label className="custom-file-label text-nowrap d-flex justify-content-start passport-loader" htmlFor="passportLoader" data-browse={appLanguage === 'eng' ? 'Browse' : 'Файл'}>{fileLabel ? fileLabel : appLanguage === 'eng' ? 'Upload passport' : 'Завантажити паспорт'}</label>
                            </div>
                            <div className="input-group-append">
                                <button disabled={!isValidFile  || isSendingFile} onClick={sendPassport} className="btn btn-secondary" type="button">{isSendingFile?<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>:appLanguage==='eng'?'Send':'Відправити'}</button>
                            </div>
                        </div>
                    </Zoom>
                    <Zoom timeout={500}  when={!startAnimationCredit}>
                        <div className={`input-group m-2 ${user['credit_card']? 'd-none' : ''}`}>
                            <input onChange={(e) => { handleCreditValue(e); setIsValidCreditCard(e.target.value.length >= 16); }} value={creditValue} type="text" className="form-control" id="inputPassword2" placeholder="Card number" />
                            <div className="input-group-append">
                                <button disabled={!isValidCreditCard || isSendingCredit} onClick={sendCreditCard} className="btn btn-secondary" type="button">{isSendingCredit?<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>:appLanguage==='eng'?'Send':'Відправити'}</button>
                            </div>
                        </div>
                    </Zoom>
                    <Zoom timeout={500}  when={!startAnimationPhone}>
                        <div className={`input-group m-2 ${user.phone ? 'd-none' : ''}`}>
                            <div className="input-group-prepend">
                                <span className={`input-group-text `}>+380</span>
                            </div>
                            <input value={phoneValue} onChange={(e) => { handlePhoneValue(e); setIsValidPhoneNumber(e.target.value.length >= 9); }} type="text" className="form-control" placeholder="Phone number" />
                            <div className="input-group-append">
                                <button disabled={!isValidPhoneNumber || isSendingPhone } onClick={sendPhone} className="btn btn-secondary" type="button">{isSendingPhone?<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>:appLanguage==='eng'?'Send':'Відправити'}</button>
                            </div>
                        </div>
                    </Zoom>
                    </div>
                </div>
            </div>
        </div>
    )
}