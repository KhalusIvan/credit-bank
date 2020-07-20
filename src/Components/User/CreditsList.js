import React, { useContext, useRef, useState } from 'react';
import User from '../../Contexts/User.js';
import AppLanguage from '../../Contexts/AppLanguage.js';
import CreditRange from './CreditRange'
import Credit from './Credit';
import '../../style/userTakeCredits.css';
export default (props) => {
    const { user } = useContext(User);
    const { appLanguage } = useContext(AppLanguage);

    const creditsArray = props.creditsArray;
    return (
        <div className='container p-0 credits-list'>
            {creditsArray.map((credit) => (
                <Credit key={credit.id} name={credit.name} min_value={credit.min_value} max_value={credit.max_value} min_term={credit.min_term} max_term={credit.max_term} percent={credit.percent} description={credit.description}/>
            ))}
        </div>
    )
}