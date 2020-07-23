import React, { useContext, useRef, useState } from 'react';
import User from '../../../../Contexts/User.js';
import AppLanguage from '../../../../Contexts/AppLanguage.js';
import CreditRange from './CreditRange'
export default (props) => {
    const { user } = useContext(User);
    const { appLanguage } = useContext(AppLanguage);
    const [money, setMoney] = useState(props.min_value);
    const [term,setTerm] = useState(props.min_term);
    function changeMoney(newSum) {
        setMoney(+newSum);
    }
    function changeTerm(newTerm) {
        setTerm(+newTerm);
    }
    return (
        <div className='credit-item'>
            <div className='credit-name text-center'>{props.name}</div>
            <div className='credit-body'>
                <CreditRange setValue={changeMoney} text={appLanguage === 'eng' ? 'Select the amount' : 'Виберіть суму'} subcontrollerText={appLanguage === 'eng' ? 'grn' : 'грн'} min={props.min_value} max={props.max_value} step={props.max_value * 0.01} />
                <CreditRange setValue={changeTerm} text={appLanguage === 'eng' ? 'Choose a term' : 'Виберіть термін'} subcontrollerText={appLanguage === 'eng' ? 'days' : 'днів'} min={props.min_term} max={props.max_term} step={props.max_term * 0.01} />
                <div className='credit-info'>
                    <div className='percent'>{appLanguage === 'eng' ? 'Percent: ' + props.percent + '%' : 'Відсоток ' + props.percent + '%'}</div>
                    <div className='commission'>{appLanguage === 'eng' ? 'You will pay: ' + (money + term * props.percent).toFixed(2) + 'grn' : 'Ви заплатете ' + (money + term * props.percent).toFixed(2) + 'грн'}</div>
                </div>
            </div>
            <div className='credit-description text-center'>{props.description}</div>
            <div className='button-take d-flex justify-content-center'><button className='btn'>{appLanguage === 'eng' ? 'Take credit' : 'Взяти кредит'}</button></div>
        </div>

    )
}