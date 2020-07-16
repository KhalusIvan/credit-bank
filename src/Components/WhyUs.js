import React, { useContext, useEffect, useRef, useState } from 'react';
import AppLanguage from '../Contexts/AppLanguage.js';
import Zoom from 'react-reveal/Zoom';
import '../style/why-us.css';
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
        <div className="jumbotron why-us p-1 p-xm-2 p-sm-4 p-lg-5 m-0 rounded-0">
            <div className='why-us-background'></div>
            <h2 className='text-center p-sm-3 p-1 m-0 mb-sm-2 why-us-title title'>{appLanguage === 'eng' ? 'Why Ukraine Credit' : 'Чому Ukraine Credit'}</h2>
            <div className='container' ref={elements}>
                <div className='row m-0'>
                    <Zoom timeout={500} when={startAnimation}>
                        <div className='col-12 col-sm-6 col-md-3 d-flex flex-column align-items-center'>
                            <div className='online-order-img img-proger'></div>
                            <p className='why-us-text text-center'>{appLanguage === 'eng' ? 'Filling out the application online' : 'Заповнення заявки онлайн'}</p>
                        </div>
                    </Zoom>
                    <Zoom timeout={500} when={startAnimation} delay={100}>
                        <div className='col-12 col-sm-6 col-md-3 d-flex flex-column align-items-center'>
                            <div className='online-order-img img-time'></div>
                            <p className='why-us-text text-center'>{appLanguage === 'eng' ? 'Quick decision making' : 'Швидке прийняття рішення'}</p>
                        </div>
                    </Zoom>
                    <Zoom timeout={500} when={startAnimation} delay={200}>
                        <div className='col-12 col-sm-6 col-md-3 d-flex flex-column align-items-center'>
                            <div className='online-order-img img-ticket'></div>
                            <p className='why-us-text text-center'>{appLanguage === 'eng' ? 'Transparency (no hidden fees)' : 'Прозорість (немає прихованих комісій)'}</p>
                        </div>
                    </Zoom>
                    <Zoom timeout={500} when={startAnimation} delay={300}>
                        <div className='col-12 col-sm-6 col-md-3 d-flex flex-column align-items-center'>
                            <div className='online-order-img img-people'></div>
                            <p className='why-us-text text-center'>{appLanguage === 'eng' ? 'Without collateral and guarantors' : 'Без застави і поручителів'}</p>
                        </div>
                    </Zoom>
                </div>
            </div>
        </div>
    )
}