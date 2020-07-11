import React, {useContext} from 'react';
import MultiCarousel from './MultiCarousel.js';
import ReviewsArray from './ReviewsArray.js';
import AppLanguage from '../Contexts/AppLanguage.js';
export default (props) =>{
    const appLanguage = useContext(AppLanguage).appLanguage;
    return(
        <div className="container jumbotron reviews pr-0 pl-0 pb-2 pt-2 pb-sm-3 pb-md-5 mb-0 rounded-0">
             <h2 className='text-center p-sm-3 p-1 m-0 mb-sm-2 reviews-title title'>{appLanguage === 'eng' ? 'Reviews' : 'Відгуки'}</h2>
            <div className='card-group'><MultiCarousel items={ReviewsArray()}/></div>
        </div>
    )
}