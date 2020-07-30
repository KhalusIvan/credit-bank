import React, { useContext, useState, useRef } from 'react';
import User from '../../../../Contexts/User.js';
import UserMyCredit from './UserMyCredit';
import Logo from '../../../Logo';
import '../../../../style/userMyCredits.css';
import AppLanguage from '../../../../Contexts/AppLanguage.js';
import Zoom from 'react-reveal/Zoom';
export default (props) => {
    const { user } = useContext(User);
    const { appLanguage } = useContext(AppLanguage);
    const [filter, setFilter] = useState('all');
    const [creditValue, setCreditValue] = useState('');
    const [isValidCreditValue, setIsValidCreditValue] = useState(false);
    const idOfModal = 'payCredit';
    const closeModalButton = useRef(null);
    const [choseCredit, setChoseCredit] = useState(null);
    function getDataAboutCredit(creditId) {
        let credit = props.creditsArray.filter(credit => credit.id === creditId);
        setChoseCredit(credit[0]);
    }
    function inputOnlyNumbers(text) {
        return /^[1-9]\d*$|^$/.test(text);
    }
    function handleCreditValue(e) {
        if (inputOnlyNumbers(e.target.value) && e.target.value.length <= 6)
            setCreditValue(e.target.value);
    }
    function sendPayment() {
        props.payCredit(choseCredit.id,creditValue);
        closeModalButton.current.click();
    }
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
                        {props.creditsArray.map((credit) => (
                            <Zoom key={credit.id} timeout={500} collapse when={filter === 'all' || filter === credit.status}>
                                <UserMyCredit getDataAboutCredit={getDataAboutCredit} idOfModal={idOfModal} avatar={user.avatar ? `url(${URL.createObjectURL(new Blob([new Uint8Array(user.avatar.data)]))})` : false} finish_sum={credit.finish_sum} name={credit.name} id={credit.id} description={credit.description} value={credit.value} term={credit.term} paid={credit.paid} start_date={credit.start_date} end_date={credit.end_date} status={credit.status} percent={credit.percent} fine={credit.fine} />
                            </Zoom>
                        ))}
                        <div className="modal fade signForm p-0 pay-credit" id={idOfModal} tabIndex="-1" role="dialog">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <Logo />
                                        <button ref={closeModalButton} type="button" className="close p-0 mt-1" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    {choseCredit ?
                                        <div className='modal-body text-center'>
                                            <div>ID {appLanguage === 'eng' ? 'of the credit: ' : 'кредиту: '}</div>
                                            <div className='credit-id text-break mb-3 font-italic'>{choseCredit.id}</div>
                                            <div>{appLanguage === 'eng' ? 'To pay the loan, send the appropriate amount to the number ' : 'Щоб оплатити кредит перешліть відповідну суму на номер '}</div>
                                            <div className='font-italic'>2454-6363-3456-2456</div>
                                            <div className='mb-3'>({appLanguage === 'eng' ? "Don't forget to provide your credit ID and email when paying" : 'Не забудьте вказати ID кредиту та вашу почту при нарахуванні'})</div>
                                            <div className='pseudo-paid'>
                                                <div className='font-weight-bold'>{appLanguage === 'eng' ? 'Pseudo payment' : 'Псевдо оплата'}</div>
                                                <div className="form-group">
                                                    <input onChange={(e)=>{handleCreditValue(e);setIsValidCreditValue(e.target.value.length > 0)}} value={creditValue} type="text" className="form-control"/>
                                                </div>
                                            </div>
                                        </div> : ''
                                    }
                                    <div className='modal-footer'>
                                        <button onClick={sendPayment} disabled={!isValidCreditValue} className='btn btn-primary' >{appLanguage === 'eng' ? 'Pay' : ' Оплатити'}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}