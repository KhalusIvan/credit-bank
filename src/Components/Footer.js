import React, { useContext } from 'react';
import AppLanguage from '../Contexts/AppLanguage.js';
import Logo from '../Components/Logo.js'
import '../style/footer.css';
export default (props) => {
    const appLanguage = useContext(AppLanguage).appLanguage;
    return (
        <div className='footer-wrapper container-fluid'>
            <footer className='container'>
                <div className='row'>
                    <div className='col-12 col-md-8'>
                        <Logo />
                        <div className='text text-muted mt-3 mb-3'>
                            {appLanguage === 'eng' ?
                            `The project is not a real online platform for a loan, but is a practical work of a 2nd year student of the Department of Computer Systems Software of Chernivtsi National University.
                            © Copyright belongs to the student developer and the University.` : 
                            `Проєкт не являеться реальною онлайн площадкою для займу, а є практичною роботою студента 2-го курсу кафедри Програмного забезпечення комп'ютерних систем Чернівецького Національного Університету.
                            © Авторські права належать студенту розробнику та Університету.`}
                        </div>
                    </div>
                    <div className='col-12 col-md-4 d-flex flex-column'>
    <h1 className='sociality-title'>{appLanguage === 'eng' ? 'Our social networks':'Наші соціальні мережі'}</h1>
                        <div className='sociality d-flex'>
                            <a href="http://google.com" target="_blank" className='sociality-link google'></a>
                            <a href="http://facebook.com" target="_blank" className='sociality-link facebook'></a>
                            <a href="http://twitter.com" target="_blank" className='sociality-link twitter'></a>
                            <a href="http://telegram.org" target="_blank" className='sociality-link telegram'></a>
                            <a href="http://linkedin.com" target="_blank" className='sociality-link id'></a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}