import React, {useContext} from 'react';
import MultiCarousel from '../Carousel/MultiCarousel.js';
import AppLanguage from '../../Contexts/AppLanguage.js';
import '../../style/reviews.css';
export default (props) =>{
    const appLanguage = useContext(AppLanguage).appLanguage;
    return(
        <div className="container jumbotron reviews pr-0 pl-0 pb-2 pt-2 pb-sm-3 pb-md-5 mb-0 rounded-0">
             <h2 className='text-center p-sm-3 p-1 m-0 mb-sm-2 reviews-title title'>{appLanguage === 'eng' ? 'Reviews' : 'Відгуки'}</h2>
            <div className='card-group'>
                <MultiCarousel items={
                props.reviewsArray.map((review, i) => (
                    <div key={review.id} className='card item'>
                        <div className="card-body">
                            <h5 className="card-title"><span style={review.avatar ? review.avatar.data.length ? { backgroundImage: `url(${URL.createObjectURL(new Blob([new Uint8Array(review.avatar.data)]))})` } : null : null} className='avatar flex-shrink-0'></span>{review.name} {review.surname}</h5>
                            <p className="card-text">{review.text}</p>
                        </div>
                        <div className="card-footer pb-1 pt-1 text-muted">
                            {appLanguage === 'eng' ? review.date_en : review.date_ua}
                        </div>
                    </div>
                ))
                }/>
            </div>
        </div>
    )
}