import React, { useContext } from 'react';
import NotVerificatedUserMessage from './NotVerificatedUserMessage.js';
import UserMyCredits from './UserMyCredits.js';
import User from '../../Contexts/User.js';
import JumbotronSeparator from '../JumbotronSeparator.js';
export default (props)=>{
    const {user} = useContext(User);
    return(
        <div className='container-fluid p-0 user-credit-wrapper'>
            {user['is_checked'] ? '' : <NotVerificatedUserMessage/>}
            <UserMyCredits/>
            <JumbotronSeparator/>
        </div>
    )
}