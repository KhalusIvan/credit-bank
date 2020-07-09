import React from 'react';
import sliderArr from '../Image/sliderImage.js';
function sliderElements(appLanguage) {
    return [
        {
            img: sliderArr.revievs,
            caption: {
                slogan: appLanguage === 'eng' ? 'The best team' : 'Найкраща команда',
                h1: appLanguage === 'eng' ? 'Our specialists work 24/7' : 'Наші спеціалісти працюють 24/7',
                small: appLanguage === 'eng' ? 'Thousands of satisfied customers and hundreds of reviews about our service' : 'Тисячі задоволених клієнтів та сотні відгуків про наш сервіс',
            }
        },
        {
            img: sliderArr.onlineCredit,
            caption: {
                slogan: appLanguage === 'eng' ? 'Need money?' : 'Потрібні гроші?',
                h1: appLanguage === 'eng' ? 'This is not a problem!' : 'Це не пробема!',
                small: appLanguage === 'eng' ? 'Register, fill out the form and get a loan here' : 'Реєструйся, заповни форму та отримай кредит тут',
                button: <button className='btn btn-primary pr-1 pl-1 pr-md-3 pl-md-3'>{appLanguage === 'eng' ? 'Registration' : 'Регістрація'}</button>
            }
        },
        {
            img: sliderArr.team,
            caption: {
                h1: appLanguage === 'eng' ? 'We have been on the market for 5 years' : 'Ми на ринку вже 5 років',
                small: appLanguage === 'eng' ? 'Experience is the key to quality work. Our team is the best in its business' : 'Досвід — це гарантія якісної роботи. Наша команда найкраща у своїй справі',
            }
        }
    ];
}
export default sliderElements;