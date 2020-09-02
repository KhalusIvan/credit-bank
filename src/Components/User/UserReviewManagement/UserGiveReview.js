import React, { useContext, useState, useEffect } from 'react';
import AppLanguage from '../../../Contexts/AppLanguage';
import UserGiveReviewImputField from './UserGiveReviewImputField.js';
import UserLastReviews from './UserLastReviews.js';
import Proxy from '../../../Contexts/Proxy.js'
import Fade from 'react-reveal/Fade';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import { wrapPromise } from '../../../script/custom.js';
import User from '../../../Contexts/User';
async function getReview() {
    let response = await fetch('https://credit-server.herokuapp.com/getUserComments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
    let result = await response.json();
    return await result;
}
let myReviewsArrayFetch = localStorage.getItem('token') ? wrapPromise(getReview()) : null;
export default (props) => {
    if (!myReviewsArrayFetch)
        return <Redirect to='/' />
    const { userName } = useParams();
    const history = useHistory();
    const { appLanguage } = useContext(AppLanguage);
    const { proxy } = useContext(Proxy);
    const { user } = useContext(User);
    const [myReviewsArray, setMyReviewsArray] = useState(myReviewsArrayFetch.read());
    useEffect(() => {
        if (user.email)
            if (userName !== props.userNameInUrl)
                history.push('/user');
    }, [user.email, userName, props.userNameInUrl]);
    useEffect(() => {
        return () => myReviewsArrayFetch.read = () => myReviewsArray;
    });
    async function deleteReview(removedId) {
        const newArray = myReviewsArray.filter(value => removedId !== value.id);
        setMyReviewsArray(newArray);
        await fetch(proxy + '/deleteComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({ 'id': removedId })
        });
    }
    async function sendEditReview(reviewId, newText) {
        setMyReviewsArray(myReviewsArray.map(value => {
            if (value.id === reviewId)
                value.text = newText;
            return value;
        }));
        await fetch(proxy + '/updateComments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                'id': reviewId,
                'text': newText,
            })
        });
    }
    function addReview(newReview) {
        let newArray = myReviewsArray.slice();
        newArray.unshift(newReview)
        setMyReviewsArray(newArray);
    }
    return (
        <Fade>
            <div className='give-review-wrapper p-0 container-fluid'>
                <div className='container p-0'>
                    <div className='jumbotron mb-0 p-0 give-review rounded-0 '>
                        <h2 className='text-center p-sm-3 p-1 m-0 mb-sm-2 give-review-title title'>{appLanguage === 'eng' ? 'My reviews' : 'Мої відгуки'}</h2>
                    </div>
                    <UserGiveReviewImputField addReview={addReview} />
                </div>
            </div>
            <UserLastReviews myReviewsArray={myReviewsArray} deleteReview={deleteReview} sendEditReview={sendEditReview} />
        </Fade>
    )
}