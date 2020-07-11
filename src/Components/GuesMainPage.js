import React, { useContext } from 'react';
import Carousel from './Carousel/Carousel.js';
import CreditConditions from './CreditConditions.js';
import WhyUs from './WhyUs.js';
import Instruction from './Instruction/Instruction.js';
import sliderElements from './sliderElements.js';
import AppLanguage from '../Contexts/AppLanguage.js';
import VideoSection from './VideoSection.js';
import Reviews from './Reviews.js';
import '../style/carousel.css';
export default (props) => {
    const appLanguage = useContext(AppLanguage).appLanguage;
    return (
        <>
            {<div className="container-fluid p-0 carousel-wrapper carousel-header">
                <Carousel isIndecators={false} id='lol' carouselItems={sliderElements(appLanguage)} />
            </div>}
            <div className='container-fluid p-0 credit-conditions-wrapper anchor' id='credit-conditions'>
                <CreditConditions />
            </div>
            <div className='container-fluid p-0 why-us-wrapper anchor' id='why-us'>
                <WhyUs />
            </div>
            <div className='container-fluid p-0 instruction-wrapper anchor' id='instruction'>
                <Instruction />
            </div>
            <VideoSection>
                <div className="container video-text h-100">
                    <div className="d-flex h-100 text-center align-items-center">
                        <div className="w-100 text-white">
    <h2 className='video-title'>{appLanguage === 'eng'? 'Try Ukraine Credit' : 'Спробуй Ukraine Credit'}</h2>
                            <p >{appLanguage === 'eng'? 'Register now and get an interest-free loan for a long time' : 'Реєструйся зараз і отримай безвідсотковий кредит на великий термін'}</p>
                            <small>{appLanguage === 'eng'? 'We will do our best to keep you satisfied' : 'Ми зробимо все, щоб ви залишились задоволеними'}</small>
                        </div>
                    </div>
                </div>
            </VideoSection>
            <div className='container-fluid p-0 reviews-wrapper'>
                <Reviews />
            </div>
        </>
    )
}