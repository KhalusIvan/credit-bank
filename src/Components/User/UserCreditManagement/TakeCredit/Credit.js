import React, { useContext, useState } from 'react';
import { useAlert } from 'react-alert'
import User from '../../../../Contexts/User.js';
import AppLanguage from '../../../../Contexts/AppLanguage.js';
import Proxy from '../../../../Contexts/Proxy';
import CreditRange from './CreditRange'
export default (props) => {
    const {proxy} = useContext(Proxy);
    const alert = useAlert();
    const { appLanguage } = useContext(AppLanguage);
    const [money, setMoney] = useState(props.min_value);
    const [term,setTerm] = useState(props.min_term);
    const [isSending, setIsSending] = useState(false);
    function changeMoney(newSum) {
        setMoney(+newSum);
    }
    function changeTerm(newTerm) {
        setTerm(+newTerm);
    }
    async function takeCredit() {
        setIsSending(true);
        let resp = await fetch(proxy + '/setUserCredit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                'id' : props.id,
                'term' : term,
                'value': money
            })
          });
        const json = await resp.json();
        setIsSending(false);
        if(json.id){
            props.addCredit(json);
            alert.success(<div><div className='alert-title'>{appLanguage === 'eng' ?  'Succes' : 'Успіх'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'You took the loan' : 'Ви взяли кредит'}</p></div>);
        }
        else if(json.status === 'limit'){
            alert.error(<div><div className='alert-title'>{appLanguage === 'eng' ?  'Error' : 'Помилка'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'The maximum number of credits is 3' : 'Максимальна кількість кредитів - 3'}</p></div>);
        }
        else if(json.status === 'expired'){
            alert.error(<div><div className='alert-title'>{appLanguage === 'eng' ?  'Error' : 'Помилка'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'You have a debt' : 'У вас є заборгованість'}</p></div>);
        }
        else if(json.status === 'credit'){
            alert.error(<div><div className='alert-title'>{appLanguage === 'eng' ?  'Error' : 'Помилка'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'Your account is not checked' : 'Ваш аккаунт не перевірен'}</p></div>);
        }
    }
    return (
        <div className='credit-item'>
            <div className='credit-name text-center'>{props.name}</div>
            <div className='credit-body'>
                <CreditRange setValue={changeMoney} text={appLanguage === 'eng' ? 'Select the amount' : 'Виберіть суму'} subcontrollerText={appLanguage === 'eng' ? 'grn' : 'грн'} min={props.min_value} max={props.max_value} step={props.max_value * 0.01} />
                <CreditRange setValue={changeTerm} text={appLanguage === 'eng' ? 'Choose a term' : 'Виберіть термін'} subcontrollerText={appLanguage === 'eng' ? 'days' : 'днів'} min={props.min_term} max={props.max_term} step={props.max_term * 0.01} />
                <div className='credit-info'>
                    <div className='percent'>{appLanguage === 'eng' ? 'Percent: ' + props.percent + '%' : 'Відсоток ' + +props.percent + '%'}</div>
                    <div className='commission'>{appLanguage === 'eng' ? 'You will pay: ' + (money + (money / 100 * +props.percent) * term).toFixed(2) + 'grn' : 'Ви заплатете ' + (money + (money / 100 * props.percent) * term).toFixed(2) + 'грн'}</div>
                </div>
            </div>
            <div className='credit-description text-center'>{props.description}</div>
            <div className='button-take d-flex justify-content-center'><button disabled={isSending} onClick={takeCredit} className='btn'>{isSending?<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>:appLanguage==='eng'?'Take credit':'Взяти кредит'}</button></div>
        </div>

    )
}