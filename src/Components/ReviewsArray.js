import React from 'react';
import '../style/reviews.css';
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
function wrapPromise(promise) {
    let status = "pending";
    let result;
    let suspender = promise.then(
        r => {
            status = "success";
            result = r;
        },
        e => {
            status = "error";
            result = e;
        }
    );
    return {
        read() {
            if (status === "pending") {
                throw suspender;
            } else if (status === "error") {
                throw result;
            } else if (status === "success") {
                return result;
            }
        }
    };
}
const reviewsArray = localStorage.getItem('token') ? null : wrapPromise(getReview());
export default (props) => {
    const reviews = reviewsArray.read();
    if(!reviews){
        return [];
    }
    else
    return reviews.map((review,i) => (
        <div key={i} className='card item'>
            <div className="card-body">
                <h5 className="card-title"><span className='avatar flex-shrink-0'></span>{review.name} {review.surname}</h5>
                <p className="card-text">{review.text}</p>
            </div>
            <div className="card-footer pb-1 pt-1 text-muted">
                {review.date}
            </div>
        </div>
    ))
}