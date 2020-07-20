import React, { useContext } from 'react';
import User from '../../Contexts/User.js';
import AppLanguage from '../../Contexts/AppLanguage.js';
import CreditRange from './CreditRange'
import '../../style/userTakeCredits.css';
export default (props) => {
    const { user } = useContext(User);
    const { appLanguage } = useContext(AppLanguage);
    const creditsArray = props.creditsArray;
    return (
        <div className='container p-0 credits-list'>
            {creditsArray.map((credit) => (
                <div key={credit.id} className='credit-item'>
                    <div className='credit-name text-center'>{credit.name}</div>
                    <div className='credit-body'>
                        <CreditRange text={appLanguage === 'eng' ? 'Select the amount' : 'Виберіть суму'} subcontrollerText={appLanguage === 'eng' ? 'grn' : 'грн'} min={credit.min_value} max={credit.max_value} step={credit.max_value * 0.01} />
                        <CreditRange text={appLanguage === 'eng' ? 'Choose a term' : 'Виберіть термін'} subcontrollerText={appLanguage === 'eng' ? 'days' : 'днів'} min={credit.min_term} max={credit.max_term} step={credit.max_term * 0.01} />
                    </div>
                    <div className='credit-description text-center'>{credit.description}</div>
                </div>
            ))}
        </div>
    )
}