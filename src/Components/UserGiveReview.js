import React, { useContext, Suspense } from 'react';
import AppLanguage from '../Contexts/AppLanguage';
import UserGiveReviewImputField from './UserGiveReviewImputField.js';
import UserLastReviews from './UserLastReviews.js';
export default (props) => {
    const { appLanguage } = useContext(AppLanguage)
    return (
        <>
        <div className='give-review-wrapper p-0 container-fluid'>
            <div className='container p-0'>
                <div className='jumbotron mb-0 p-0 give-review rounded-0 '>
                    <h2 className='text-center p-sm-3 p-1 m-0 mb-sm-2 give-review-title title'>{appLanguage === 'eng' ? 'My reviews' : 'Мої відгуки'}</h2>
                </div>
                <UserGiveReviewImputField/>
            </div>
        </div>
        <UserLastReviews/>
        </>
    )
}