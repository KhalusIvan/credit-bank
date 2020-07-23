import React, { useContext, useRef, useState } from 'react';
import User from '../../../../Contexts/User.js';
import AppLanguage from '../../../../Contexts/AppLanguage.js';
export default (props) => {
    const { user } = useContext(User);
    const { appLanguage } = useContext(AppLanguage);
    return (
        <div className={`credit-item ${props.status}`} >
            <div className='credit-title'>
                <div className='user-data'>
                    <div className='avatar flex-shrink-0' style={{ backgroundImage: props.avatar ? props.avatar : '' }}></div>
                    <div className='user-name'>{user.first_name + " " + user.second_name}</div>
                </div>
                <div className='credit-name text-center'>{props.name}</div>
            </div>
            <div className='credit-body d-flex justify-content-between'>
                <div className='credit-data'>
                    <div className='credit-start'>{appLanguage === 'eng' ? 'You took the loan: ' : 'Ви взяли кредит: '}{`${props.start_date.getDate()}.${props.start_date.getMonth() + 1}.${props.start_date.getFullYear()}`}</div>
                    <div className='credit-term'>{appLanguage === 'eng' ? 'On term ' + props.term + 'days' : 'На термін ' + props.term + 'днів'}</div>
                    <div className='credit-value'>{appLanguage === 'eng' ? 'Loan amount ' + props.value + 'grn' : 'Сума кредиту ' + props.value + 'грн'}</div>
                    <div className='credit-percent'>{appLanguage === 'eng' ? 'Percent ' + props.percent : 'Відсоток ' + props.percent}%</div>
                </div>
                <div className='credit-payd-data'>
                    <div className='credit-end'>{props.status !== 'active' ? appLanguage === 'eng' ? 'Payment was expected until: ' : 'Оплата очікувалась до: ':appLanguage === 'eng' ? 'Payment expected until: ' : 'Оплата очікується до: '}{`${props.end_date.getDate()}.${props.end_date.getMonth() + 1}.${props.end_date.getFullYear()}`}</div>
                    <div className='credit-payd-value'>{appLanguage === 'eng' ? 'You payd ' + props.payd + 'grn from ' : 'Ви заплaтили ' + props.payd + 'грн з '}{props.value + props.percent * props.term}</div>
                    <div className={`credit-payd-fine ${props.status === 'expired' ? '':'d-none'}`}>{appLanguage === 'eng' ? 'Fine is  ' + props.fine + ' per day' : 'Штраф: ' + props.fine + ' в день'}</div>
                </div>
            </div>
            <div className='credit-description text-center'>{props.description}</div>
        </div>
    )
}