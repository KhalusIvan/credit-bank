import React, { useContext } from 'react';
import NotVerificatedUserMessage from '../NotVerificatedUserMessage.js';
import UserMyCredits from './MyCredits/UserMyCredits.js';
import UserTakeCredits from './TakeCredit/UserTakeCredits';
import User from '../../../Contexts/User.js';
import JumbotronSeparator from '../../JumbotronSeparator.js';
const myCreditsArray = [
    {
        name: 'Min credit',
        id: 1,
        description: 'Мінімальний кредит, який обробляється шидко',
        value: 2500,
        term: 5,
        payd: 44,
        start_date: new Date(2020,6,22),
        end_date: new Date(2020,6,27),
        status: 'active',
        percent: 0.1
    },
    {
        name: 'Midfhdfgn credit',
        id: 5,
        description: 'Мінімальний кредит, який обробляється шидко',
        value: 2500,
        term: 5,
        payd: 44,
        start_date: new Date(2020,6,22),
        end_date: new Date(2020,6,27),
        status: 'active',
        percent: 0.1
    },
    {
        name: 'Max credit',
        id: 2,
        description: 'cghdfghdfgh кредит, який оброdf ghdfgh бляється шидко',
        value: 22500,
        term: 50,
        payd: 0,
        start_date: new Date(2020,6,20-50),
        end_date: new Date(2020,6,10),
        status: 'expired',
        fine: 500,
        percent: 2
    },
    {
        name: 'middle credit',
        id: 3,
        description: 'кредит, який оброdf ghdfgh бляється шидко',
        value: 10000,
        term: 5,
        payd: 10008,
        start_date: new Date(2020,6,15),
        end_date: new Date(2020,6,20),
        status: 'closed',
        percent: 1
    }
];
const allCreditsArray = [
    {
        name: 'Min credit',
        id: 1,
        description: 'Мінімальний кредит, який обробляється шидко',
        min_value: 100,
        max_value: 5000,
        min_term: 2,
        max_term: 30,
        percent: 0.1
    },
    {
        name: 'Max credit',
        id: 3,
        description: 'Але треба почекати на обробку адміністратора Макс кредит. Великі суми на великий термін. Але треба почекати на обробку адміністратора',
        min_value: 10000,
        max_value: 50000,
        min_term: 30,
        max_term: 60,
        percent: 2
    },
    {
        name: 'Middle credit',
        id: 2,
        description: 'Середній кредит - більше сума та термін. Але більший відсоток',
        min_value: 2000,
        max_value: 10000,
        min_term: 10,
        max_term: 50,
        percent: 1
    }
]
export default (props)=>{
    const {user} = useContext(User);
    return(
        <div className='container-fluid p-0 user-credit-wrapper'>
            {user['is_checked'] ? '' : <NotVerificatedUserMessage/>}
            <UserMyCredits creditsArray={myCreditsArray}/>
            <JumbotronSeparator/>
            <UserTakeCredits creditsArray={allCreditsArray}/>
        </div>
    )
}
