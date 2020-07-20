import React, { useContext, useRef, useState } from 'react';
import User from '../../Contexts/User.js';
import AppLanguage from '../../Contexts/AppLanguage.js';
import CreditRange from './CreditRange'
export default (props) => {
    const { user } = useContext(User);
    const { appLanguage } = useContext(AppLanguage);
    const [money, setMoney] = useState();
    function changeMoney(newSum) {
        console.log(1);
        setMoney(newSum);
    }
    console.log(money);
    return (

        <div className='credit-item'>
            <div className='credit-name text-center'>{props.name}</div>
            <div className='credit-body'>
                <CreditRange setValue={changeMoney} text={appLanguage === 'eng' ? 'Select the amount' : 'Виберіть суму'} subcontrollerText={appLanguage === 'eng' ? 'grn' : 'грн'} min={props.min_value} max={props.max_value} step={props.max_value * 0.01} />
                <CreditRange setValue={changeMoney} text={appLanguage === 'eng' ? 'Choose a term' : 'Виберіть термін'} subcontrollerText={appLanguage === 'eng' ? 'days' : 'днів'} min={props.min_term} max={props.max_term} step={props.max_term * 0.01} />
                <div className='credit-info'>
                    <div className='percent'>{props.percent}</div>
                    <div className='commission'></div>
                </div>
            </div>
            <div className='credit-description text-center'>{props.description}</div>
        </div>

    )
}