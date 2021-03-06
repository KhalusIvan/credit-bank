import React, { useContext, useState, useEffect } from 'react';
import Carousel from '../Carousel/Carousel.js';
import CreditConditions from './CreditConditions.js';
import WhyUs from './WhyUs.js';
import Instruction from './Instruction/Instruction.js';
import sliderElements from './sliderElements.js';
import AppLanguage from '../../Contexts/AppLanguage.js';
import Proxy from '../../Contexts/Proxy.js';
import VideoSection from './VideoSection.js';
import Reviews from './Reviews.js';
import SignForm from './SignForm.js';
import '../../style/carousel.css';
export default (props) => {
    const appLanguage = useContext(AppLanguage).appLanguage;
    const [reviewsArray, setReviewsArray] = useState(null);
    const {proxy} = useContext(Proxy);
    useEffect(() => {
        async function getReviewsFetch() {
            let response = await fetch(proxy+'/getAllComments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            let result = await response.json();
            setReviewsArray(result);
        }
        getReviewsFetch();
    }, [])
    return (
        <>
            <div className="container-fluid p-0 carousel-wrapper carousel-header">
                <Carousel isIndecators={false} id='lol' carouselItems={sliderElements(appLanguage)} />
            </div>
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
                            <h2 className='video-title'>{appLanguage === 'eng' ? 'Try Ukraine Credit' : '?????????????? Ukraine Credit'}</h2>
                            <p >{appLanguage === 'eng' ? 'Register now and get an interest-free loan for a long time' : '???????????????????? ?????????? ?? ?????????????? ???????????????????????????? ???????????? ???? ?????????????? ????????????'}</p>
                            <small>{appLanguage === 'eng' ? 'We will do our best to keep you satisfied' : '???? ?????????????? ??????, ?????? ???? ???????????????????? ????????????????????????'}</small>
                        </div>
                    </div>
                </div>
            </VideoSection>
            <div className='container-fluid p-0 reviews-wrapper'>
                {reviewsArray ? <Reviews reviewsArray={reviewsArray} /> : ''}
            </div>
            <SignForm />
        </>
    )
}