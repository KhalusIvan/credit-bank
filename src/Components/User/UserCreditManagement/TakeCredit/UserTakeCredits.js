import React, { useContext } from 'react';
import User from '../../../../Contexts/User.js';
import Credit from './Credit';
import '../../../../style/userTakeCredits.css';
import AppLanguage from '../../../../Contexts/AppLanguage.js';

export default (props) => {
    const { user } = useContext(User);
    const { appLanguage } = useContext(AppLanguage);
    return (
        <div className='container-fluid p-0 user-take-credits-wrapper'>
            <div className='container p-0 user-take-credits'>
                <div className="jumbotron p-1 p-xm-2 p-sm-4 p-lg-5 m-0 rounded-0 bg-transparent">
                    <h2 className='text-center p-sm-3 p-1 m-0 mb-sm-2 user-take-credits title'>{appLanguage === 'eng' ? 'All credits' : 'Всі кредити'}</h2>
                    {
                        user['ischecked'] ?
                            <p className='lead text-center'>{appLanguage === 'eng' ? 'All credits will be displayed here' : 'Тут будуть відображатися всі кредити'}</p> :
                            <>
                            <p className='text-center'>Увага! У випадку прострочення кредиту, його відсоток збільшиться вдвічі</p>
                            <div className='container p-0 credits-list'>
                                {props.creditsArray.map((credit) => (
                                    <Credit addCredit={props.addCredit} id={credit.id} key={credit.id} name={credit.name} min_value={credit.min_value} max_value={credit.max_value} min_term={credit.min_term} max_term={credit.max_term} percent={credit.percent} description={credit.description} />
                                ))}
                            </div>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}