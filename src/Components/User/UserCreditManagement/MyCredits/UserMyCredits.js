import React, { useContext, useState } from 'react';
import User from '../../../../Contexts/User.js';
import UserMyCredit from './UserMyCredit';
import '../../../../style/userMyCredits.css';
import AppLanguage from '../../../../Contexts/AppLanguage.js';
import Zoom from 'react-reveal/Zoom';
export default (props) => {
    const { user } = useContext(User);
    const { appLanguage } = useContext(AppLanguage);
    const [filter, setFilter] = useState('all');
    return (
        <div className='container-fluid p-0 user-my-credits-wrapper'>
            <div className='container p-0 user-my-credits'>
                <div className="jumbotron p-1 p-xm-2 p-sm-4 p-lg-5 m-0 rounded-0 bg-transparent">
                    <h2 className='text-center p-sm-3 p-1 m-0 mb-sm-2 user-my-credits title'>{appLanguage === 'eng' ? 'My credits' : 'Мої кредити'}</h2>
                    <p className='lead text-center'>{appLanguage === 'eng' ? 'Your credits will be displayed here' : 'Тут будуть відображатися ваші кредити'}</p>
                    <div className='button-panel row'>
                        <div className='col-12 col-md-6 col-lg-3'><button onClick={() => setFilter('all')} className='btn btn-secondary text-nowrap'>{appLanguage === 'eng' ? 'All loans' : 'Всі кредити'}</button></div>
                        <div className='col-12 col-md-6 col-lg-3'><button onClick={() => setFilter('active')} className='btn btn-primary text-nowrap'>{appLanguage === 'eng' ? 'Current loans' : 'Активні кредити'}</button></div>
                        <div className='col-12 col-md-6 col-lg-3'><button onClick={() => setFilter('expired')} className='btn btn-danger text-nowrap'>{appLanguage === 'eng' ? 'Overdue loans' : 'Прострочені кредити'}</button></div>
                        <div className='col-12 col-md-6 col-lg-3'><button onClick={() => setFilter('closed')} className='btn btn-info text-nowrap'>{appLanguage === 'eng' ? 'Closed loans' : 'Закриті кредити'}</button></div>
                    </div>
                    <div className='container user-my-credits-list not-reveal'>
                        {props.creditsArray.map(credit => (
                            <Zoom key={credit.id} timeout={500} collapse when={filter === 'all' || filter === credit.status}>
                                <UserMyCredit  avatar={user.avatar ? `url(${URL.createObjectURL(new Blob([new Uint8Array(user.avatar.data)]))})` : false} finish_sum={credit.finish_sum} name={credit.name} id={credit.id} description={credit.description} value={credit.value} term={credit.term} paid={credit.paid} start_date={credit.start_date} end_date={credit.end_date} status={credit.status} percent={credit.percent} fine={credit.fine} />
                            </Zoom>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}