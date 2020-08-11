import React, { useContext, useRef, useState } from 'react';
import '../../style/NotVerificatedUserMessage.css';
import User from '../../Contexts/User';
import Proxy from '../../Contexts/Proxy'
import AppLanguage from '../../Contexts/AppLanguage';
import Zoom from 'react-reveal/Zoom';
export default (props) => {
    const { appLanguage } = useContext(AppLanguage);
    const { user, changeUserPassport, changeUserCreditCard, changeUserPhone } = useContext(User);
    const { proxy } = useContext(Proxy);
    const passportLoader = useRef(null);
    const canvas = useRef(null);

    const [isValidFile, setIsValidFile] = useState(false);
    const [isValidCreditCard, setIsValidCreditCard] = useState(false);
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);

    const [isSendingFile, setIsSendingFile] = useState(false);
    const [isSendingCredit, setIsSendingCredit] = useState(false);
    const [isSendingPhone, setIsSendingPhone] = useState(false);

    const [startAnimationFile, setStartAnimationFile] = useState(false);
    const [startAnimationCredit, setStartAnimationCredit] = useState(false);
    const [startAnimationPhone, setStartAnimationPhone] = useState(false);


    const [creditValue, setCreditValue] = useState('');
    const [phoneValue, setPhoneValue] = useState('');
    const [fileLabel, setFileLabel] = useState(null);

    function changeFile() {
        const file = passportLoader.current.files[0];
        if(!file) return;
        setFileLabel(file.name);
        setIsValidFile(true);
        let reader = new FileReader();
        reader.onload = function (e) {
            let img = new Image();
            img.onload = function () {
                const ctx = canvas.current.getContext('2d');
                canvas.current.width = img.width;
                canvas.current.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.current.width, canvas.current.height);
                ctx.beginPath();
            }
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
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
    async function sendPassport() {
        setIsSendingFile(true);
        let imageBlob = await new Promise(resolve => canvas.current.toBlob(resolve, 'image/jpeg'));
        let comprimed;
        if(imageBlob.size > 500000){
            comprimed = await new Promise(resolve => canvas.current.toBlob(resolve, 'image/jpeg',0.2));
        }else if(imageBlob.size > 100000 && imageBlob.size <= 500000){
            comprimed = await new Promise(resolve => canvas.current.toBlob(resolve, 'image/jpeg',0.4));
        }else if(imageBlob.size > 50000 && imageBlob.size <= 100000){
            comprimed = await new Promise(resolve => canvas.current.toBlob(resolve, 'image/jpeg',0.6));
        }else if(imageBlob.size > 10000 && imageBlob.size <= 50000){
            comprimed = await new Promise(resolve => canvas.current.toBlob(resolve, 'image/jpeg',0.8));
        }else{
            comprimed = imageBlob;
        }
        let formData = new FormData();
        formData.append("file",await comprimed, "image.png");
        let response = await fetch(proxy+'/updatePassport', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: formData
        });
        let result = await response.json();
        if(result.status === 'ok'){
            changeUserPassport(true);
            setStartAnimationFile(true);
            setIsSendingFile(false);
        }
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
            setStartAnimationCredit(true);
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
            setStartAnimationPhone(true);
            changeUserPhone('+380' + phoneValue);
        }
    }
    return (
        <div className='container-fluid p-0 not-verificated-user-wrapper'>
            <div className='container  not-verificated-user p-3'>
                <p className={`not-verificated-user-titile text-center`}>{!user['credit_card'] || !user.is_passport || !user.phone ?
                    appLanguage === 'eng' ? `To take a loan you need to confirm your ${user.is_passport ? '' : 'passport'} ${user.phone ? '' : 'phone'} ${user['credit_card'] ? '' : 'credit card'}` : `Щоб взяти кредит вам залишилося підтвердити ${user.is_passport ? '' : 'паспорт'} ${user.phone ? '' : 'телефон'} ${user['credit_card'] ? '' : 'кредитну карту'}` :
                    appLanguage === 'eng' ? 'You will be able to take a loan after the service administrator checks your data' : 'Ви зможете брати кредит після того, як адміністратор сервісу перевірить ваші дані'
                }</p>
                <div className={`form-inline ${user.is_passport && user.phone && user['credit_card'] ? 'd-none' : ''}`}>
                    <div className='d-flex justify-content-center w-100 align-items-center flex-column flex-lg-row'>
                        <Zoom timeout={500} when={!startAnimationFile}>
                            <div className={`input-group m-2 ${user.is_passport ? 'd-none' : ''}`}>
                                <div className="custom-file">
                                    <input ref={passportLoader} onChange={changeFile} style={{ cursor: 'pointer' }} type="file" name="picture" className="fileLoader custom-file-input" id="passportLoader" accept="image/*"></input>
                                    <label className="custom-file-label text-nowrap d-flex justify-content-start passport-loader" htmlFor="passportLoader" data-browse={appLanguage === 'eng' ? 'Browse' : 'Файл'}>{fileLabel ? fileLabel : appLanguage === 'eng' ? 'Upload passport' : 'Завантажити паспорт'}</label>
                                </div>
                                <div className="input-group-append">
                                    <button disabled={!isValidFile || isSendingFile} onClick={sendPassport} className="btn btn-secondary" type="button">{isSendingFile ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : appLanguage === 'eng' ? 'Send' : 'Відправити'}</button>
                                </div>
                            </div>
                        </Zoom>
                        <Zoom timeout={500} when={!startAnimationCredit}>
                            <div className={`input-group m-2 ${user['credit_card'] ? 'd-none' : ''}`}>
                                <input onChange={(e) => { handleCreditValue(e); setIsValidCreditCard(e.target.value.length >= 16); }} value={creditValue} type="text" className="form-control" placeholder="Card number" />
                                <div className="input-group-append">
                                    <button disabled={!isValidCreditCard || isSendingCredit} onClick={sendCreditCard} className="btn btn-secondary" type="button">{isSendingCredit ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : appLanguage === 'eng' ? 'Send' : 'Відправити'}</button>
                                </div>
                            </div>
                        </Zoom>
                        <Zoom timeout={500} when={!startAnimationPhone}>
                            <div className={`input-group m-2 ${user.phone ? 'd-none' : ''}`}>
                                <div className="input-group-prepend">
                                    <span className={`input-group-text `}>+380</span>
                                </div>
                                <input value={phoneValue} onChange={(e) => { handlePhoneValue(e); setIsValidPhoneNumber(e.target.value.length >= 9); }} type="text" className="form-control" placeholder="Phone number" />
                                <div className="input-group-append">
                                    <button disabled={!isValidPhoneNumber || isSendingPhone} onClick={sendPhone} className="btn btn-secondary" type="button">{isSendingPhone ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : appLanguage === 'eng' ? 'Send' : 'Відправити'}</button>
                                </div>
                            </div>
                        </Zoom>
                    </div>
                </div>
            </div>
            <canvas ref={canvas} style={{ with: 0, height: 0 }}></canvas>
        </div>
    )
}