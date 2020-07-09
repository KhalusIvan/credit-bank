import React, { useContext } from 'react';
import AppLanguage from '../Contexts/AppLanguage.js';
import '../style/creditConditions.css';
export default (props) => {
    const appLanguage = useContext(AppLanguage).appLanguage;
    return (
        <div className="jumbotron m-0 credit-conditions p-1 p-xm-2 p-sm-3 rounded-0">
            <h2 className='text-center p-sm-3 p-1 m-0 mb-sm-2 credit-conditions-title title'>{appLanguage === 'eng' ? 'Terms of financing' : 'Умови фінансування'}</h2>
            <div className='container'>
                <div className='row m-0'>
                    <div className='col-6 col-sm-6 d-flex align-items-center condition'>
                        <span className='check-mark-img flex-shrink-0'></span>
                        <span><h3 className='m-0 condition-text'>{appLanguage === 'eng' ? 'Age 18-19 years old' : 'Вік 18-70 років'}</h3></span>
                    </div>
                    <div className='col-6 col-sm-6 d-flex align-items-center condition'>
                        <span className='check-mark-img flex-shrink-0'></span>
                        <span><h3 className='m-0  condition-text'>{appLanguage === 'eng' ? 'Stable source of income' : 'Стабільне джерело доходу'}</h3></span>
                    </div>
                    <div className='col-6 col-sm-6 d-flex align-items-center condition'>
                        <span className='check-mark-img flex-shrink-0'></span>
                        <span><h3 className='m-0  condition-text'>{appLanguage === 'eng' ? 'Passport of a citizen of Ukraine' : 'Паспорт громадянина України'}</h3></span>
                    </div>
                    <div className='col-6 col-sm-6 d-flex align-items-center condition'>
                        <span className='check-mark-img flex-shrink-0'></span>
                        <span><h3 className='m-0  condition-text'>{appLanguage === 'eng' ? 'Financial responsibility' : 'Фінансова відповідальність'}</h3></span>
                    </div>
                    <div className='col-6 col-sm-6 d-flex align-items-center condition'>
                        <span className='check-mark-img flex-shrink-0'></span>
                        <span><h3 className='m-0  condition-text'>{appLanguage === 'eng' ? 'Availability of a bank card' : 'Наявність банківської картки'}</h3></span>
                    </div>
                    <div className='col-6 col-sm-6 d-flex align-items-center condition'>
                        <span className='check-mark-img flex-shrink-0'></span>
                        <span><h3 className='m-0  condition-text'>{appLanguage === 'eng' ? 'No financial convictions' : 'Відсутність фінансових судимостей'}</h3></span>
                    </div>
                </div>
            </div>
        </div>
    )
}