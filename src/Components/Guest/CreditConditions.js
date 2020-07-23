import React, { useContext, useEffect, useRef, useState } from 'react';
import AppLanguage from '../../Contexts/AppLanguage.js';
import '../../style/creditConditions.css';
import Fade from 'react-reveal/Fade';
export default (props) => {
    const appLanguage = useContext(AppLanguage).appLanguage;
    const [startAnimation, setStartAnimation] = useState(false);
    const elements = useRef(null);
    function isStartAnimation() {
        if (elements.current.getBoundingClientRect().top + 200 < document.documentElement.clientHeight)
            setStartAnimation(true);
    }
    useEffect(() => {
        if (!startAnimation) {
            window.addEventListener('scroll', isStartAnimation);
            window.addEventListener('load', isStartAnimation);
            return () => {
                window.removeEventListener('scroll', isStartAnimation);
                window.removeEventListener('load', isStartAnimation);
            }
        }
    }, [startAnimation]);
    return (
        <div className="jumbotron m-0 credit-conditions p-1 p-xm-2 p-sm-3 rounded-0">
            <h2 className='text-center p-sm-3 p-1 m-0 mb-sm-2 credit-conditions-title title'>{appLanguage === 'eng' ? 'Terms of financing' : 'Умови фінансування'}</h2>
            <div className='container' ref={elements}>
                <div className='row m-0 not-reveal' >
                    <Fade left when={startAnimation} timeout={500}>
                        <div className='col-6 col-sm-6 d-flex align-items-center condition'>
                            <span className='check-mark-img flex-shrink-0'></span>
                            <span><h3 className='m-0 condition-text'>{appLanguage === 'eng' ? 'Age 18-19 years old' : 'Вік 18-70 років'}</h3></span>
                        </div>
                    </Fade>
                    <Fade left when={startAnimation} delay={100}>
                        <div className='col-6 col-sm-6 d-flex align-items-center condition'>
                            <span className='check-mark-img flex-shrink-0'></span>
                            <span><h3 className='m-0  condition-text'>{appLanguage === 'eng' ? 'Stable source of income' : 'Стабільне джерело доходу'}</h3></span>
                        </div>
                    </Fade>
                    <Fade left when={startAnimation} delay={200}>
                        <div className='col-6 col-sm-6 d-flex align-items-center condition'>
                            <span className='check-mark-img flex-shrink-0'></span>
                            <span><h3 className='m-0  condition-text'>{appLanguage === 'eng' ? 'Passport of a citizen of Ukraine' : 'Паспорт громадянина України'}</h3></span>
                        </div>
                    </Fade>
                    <Fade left when={startAnimation} delay={300}>
                        <div className='col-6 col-sm-6 d-flex align-items-center condition'>
                            <span className='check-mark-img flex-shrink-0'></span>
                            <span><h3 className='m-0  condition-text'>{appLanguage === 'eng' ? 'Financial responsibility' : 'Фінансова відповідальність'}</h3></span>
                        </div>
                    </Fade>
                    <Fade left when={startAnimation} delay={400}>
                        <div className='col-6 col-sm-6 d-flex align-items-center condition'>
                            <span className='check-mark-img flex-shrink-0'></span>
                            <span><h3 className='m-0  condition-text'>{appLanguage === 'eng' ? 'Availability of a bank card' : 'Наявність банківської картки'}</h3></span>
                        </div>
                    </Fade>
                    <Fade left when={startAnimation} delay={500}>
                        <div className='col-6 col-sm-6 d-flex align-items-center condition'>
                            <span className='check-mark-img flex-shrink-0'></span>
                            <span><h3 className='m-0  condition-text'>{appLanguage === 'eng' ? 'No financial convictions' : 'Відсутність фінансових судимостей'}</h3></span>
                        </div>
                    </Fade>
                </div>

            </div>
        </div>
    )
}