import React, { useContext, useState } from 'react';
import AppLanguage from '../../Contexts/AppLanguage.js';
import '../../style/instruction.css';

import InstructionSwitcher from './InstructionSwitcher.js';
import InstructionCard from './InstructionCard';
export default (props) => {
    const [active, setActive] = useState('left');
    function toggleActive(e) {
        e.target.classList.contains('first-variant') ? setActive('left') : setActive('right');
    }
    const appLanguage = useContext(AppLanguage).appLanguage;
    return (
        <div className='instruction-background position-relative'>
            <div className='smileGirl d-none d-md-block'></div>
            <div className='jumbotron rounded-0 instruction ml-auto text-center bg-transparent p-2 p-sm-3 p-md-4 mb-0'>
                <h2 className='instruction-title title'>{appLanguage === 'eng' ? 'How to use our service' : 'Як користуватися нашим сервісом'}</h2>
                <div className='container instruction-list d-flex align-items-center flex-column'>
                    <InstructionSwitcher active={active} toggleFunction={toggleActive} classSwitcher='instruction-switcher text-center mt-3 mb-3' firstVariant={appLanguage === 'eng' ? 'How to get a loan' :'Як взяти кредит'} secondVariant={appLanguage === 'eng' ? 'How to repay а loan' :'Як погасити кредит'} />
                    {active === 'left' ?
                        (<div className='row mt-2 m-0'>
                            <div className='col-12 col-md-6 mb-1 mt-1 mb-md-2 mt-md-2 d-flex justify-content-center'>
                                <InstructionCard title={appLanguage === 'eng' ? '1. Registration' :'1. Реєстрація'} text={appLanguage === 'eng' ? 'Click the "register" button and fill out the registration form' :'Натисніть кнопку "реєстрація" та заповніть форму реєстрації'} />
                            </div>
                            <div className='col-12 col-md-6 mb-1 mt-1 mb-md-2 mt-md-2 d-flex justify-content-center'>
                                <InstructionCard title={appLanguage === 'eng' ? '2. Select conditions' :'2. Виберіть умови'} text={appLanguage === 'eng' ? 'Select the amount and term of the loan and click" Get money ' :'Виберіть суму та строк кредиту, потім натисніть "Отримати гроші"'} />
                            </div>
                            <div className='col-12 col-md-6 mb-1 mt-1 mb-md-2 mt-md-2 d-flex justify-content-center'>
                                <InstructionCard title={appLanguage === 'eng' ? '3. Fill in the application ' :'3. Заповніть заявку'} text={appLanguage === 'eng' ? 'Fill out a simple application so we can decide on your loan' :'Заповніть просту заяву, щоб ми могли прийняти рішення щодо вашого кредиту'} />
                            </div>
                            <div className='col-12 col-md-6 mb-1 mt-1 mb-md-2 mt-md-2 d-flex justify-content-center'>
                                <InstructionCard title={appLanguage === 'eng' ? '4. Money on the card' :'4. Гроші на картці'} text={appLanguage === 'eng' ? "After reviewing the application, the money is immediately transferred to your card" :'Пілся розглядання заявки гроші pараховуються на вашу карту моментально'} />
                            </div>
                        </div>) :
                        (<div className='row mt-2 m-0'>
                            <div className='col-12 col-md-6 mb-1 mt-1 mb-md-2 mt-md-2 d-flex justify-content-center'>
                                <InstructionCard title={appLanguage === 'eng' ? 'Fast online' :'Швидко онлайн'} text={appLanguage === 'eng' ? 'Go to your personal account and pay' :'Зайдіть в ваш особистий кабінет і оплатіть'} />
                            </div>
                            <div className='col-12 col-md-6 mb-1 mt-1 mb-md-2 mt-md-2 d-flex justify-content-center'>
                                <InstructionCard title={appLanguage === 'eng' ? 'Through Privat24' :'Через Приват24'} text={appLanguage === 'eng' ? 'Go to privat24 find Ukraine Bank and send money on your behalf' :'Зайдіть в приват24 найдіть Ukraine Bank і перешліть гроші від вашого імені'} />
                            </div>
                            <div className='col-12 col-md-6 mb-1 mt-1 mb-md-2 mt-md-2 d-flex justify-content-center'>
                                <InstructionCard title={appLanguage === 'eng' ? 'Terminal' :'Термінал'} text={appLanguage === 'eng' ? 'You can repay the loan in the terminal of any bank':'Ви можете погасити кредит в терміналі будь-якого банку'} />
                            </div>
                            <div className='col-12 col-md-6 mb-1 mt-1 mb-md-2 mt-md-2 d-flex justify-content-center'>
                                <InstructionCard title={appLanguage === 'eng' ? 'At the box office' :'В касі'} text={appLanguage === 'eng' ? 'At the box office of any bank will help you repay the loan' :'В касі будь-якого банка вам допоможуть погасити кредит'}/>
                            </div>
                        </div>)}
                </div>
            </div>
        </div>
    )
}