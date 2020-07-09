import React, { useContext } from 'react';
import AppLanguage from '../Contexts/AppLanguage.js';
import '../style/why-us.css';
export default (props) =>{
    const appLanguage = useContext(AppLanguage).appLanguage;
    return(
        <div className="jumbotron why-us p-1 p-xm-2 p-sm-4 p-lg-5 m-0 rounded-0">
            <div className='why-us-background'></div>
            <h2 className='text-center p-sm-3 p-1 m-0 mb-sm-2 why-us-title title'>{appLanguage === 'eng' ? 'Why Ukraine Credit' : 'Чому Ukraine Credit'}</h2>
            <div className='container'>
                <div className='row m-0'>
                    <div className='col-12 col-sm-6 col-md-3 d-flex flex-column align-items-center'>
                        <div className='online-order-img img-proger'></div>
                        <p className='why-us-text text-center'>Заповнення заявки онлайн</p>
                    </div>
                    <div className='col-12 col-sm-6 col-md-3 d-flex flex-column align-items-center'>
                        <div className='online-order-img img-time'></div>
                        <p className='why-us-text text-center'>Швидке прийняття рішення</p>
                    </div>
                    <div className='col-12 col-sm-6 col-md-3 d-flex flex-column align-items-center'>
                        <div className='online-order-img img-ticket'></div>
                        <p className='why-us-text text-center'>Прозорість (немає прихованих комісій)</p>
                    </div>
                    <div className='col-12 col-sm-6 col-md-3 d-flex flex-column align-items-center'>
                        <div className='online-order-img img-people'></div>
                        <p className='why-us-text text-center'>Без застави і поручителів</p>
                    </div>
                </div>
            </div>
        </div>
    )
}