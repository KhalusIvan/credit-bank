import React, { useContext } from 'react';
import User from '../../Contexts/User.js';
import '../../style/userMyCredits.css';
import AppLanguage from '../../Contexts/AppLanguage.js';
export default (props) => {
    const { user } = useContext(User);
    const {appLanguage} = useContext(AppLanguage);
    return (
        <div className='container-fluid p-0 user-my-credits-wrapper'>
            <div className='container p-0 user-my-credits'>
                <div className="jumbotron p-1 p-xm-2 p-sm-4 p-lg-5 m-0 rounded-0 bg-transparent">
                    <h2 className='text-center p-sm-3 p-1 m-0 mb-sm-2 user-my-credits title'>{appLanguage === 'eng' ? 'My credits' : 'Мої кредити'}</h2>
                    <p className='lead text-center'>{appLanguage === 'eng' ? 'Your credits will be displayed here' : 'Тут будуть відображатися ваші кредити'}</p>
                </div>
            </div>
        </div>
    )
}