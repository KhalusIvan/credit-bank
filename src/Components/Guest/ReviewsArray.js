import React, { useContext } from 'react';
import {wrapPromise} from '../../script/custom.js';
import '../../style/reviews.css';
import AppLanguage from '../../Contexts/AppLanguage.js';
async function getReview(){
    let response = await fetch('https://credit-bank-practice.herokuapp.com/getAllComments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    let result = await response.json();
    console.log(result);
    return await result;
}
const reviewsArray = localStorage.getItem('token') ? {read:()=>null} : wrapPromise(getReview());
export default (props) => {
    const reviews = reviewsArray.read();
    const {appLanguage} = useContext(AppLanguage);
    if(!reviews){
        return [];
    }
    else
    return reviews.map((review,i) => (
        <div key={i} className='card item'>
            <div className="card-body">
                <h5 className="card-title"><span style={ review.avatar ? { backgroundImage: `url(${URL.createObjectURL(new Blob([new Uint8Array(review.avatar.data)]))})`} : null} className='avatar flex-shrink-0'></span>{review.name} {review.surname}</h5>
                <p className="card-text">{review.text}</p>
            </div>
            <div className="card-footer pb-1 pt-1 text-muted">
                {appLanguage === 'eng' ? review.date_en : review.date_ua}
            </div>
        </div>
    ))
}