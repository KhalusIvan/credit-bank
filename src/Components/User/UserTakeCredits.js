import React, { useContext } from 'react';
import User from '../../Contexts/User.js';
import Credit from './Credit';
import '../../style/userTakeCredits.css';
import AppLanguage from '../../Contexts/AppLanguage.js';
const creditsArray = [
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
                            <div className='container p-0 credits-list'>
                                {creditsArray.map((credit) => (
                                    <Credit key={credit.id} name={credit.name} min_value={credit.min_value} max_value={credit.max_value} min_term={credit.min_term} max_term={credit.max_term} percent={credit.percent} description={credit.description} />
                                ))}
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}