import React, { useContext, useState, useEffect } from 'react';
import AppLanguage from '../Contexts/AppLanguage';
import UserGiveReviewImputField from './UserGiveReviewImputField.js';
import UserLastReviews from './UserLastReviews.js';
import User from '../Contexts/User';
import Proxy from '../Contexts/Proxy.js'
import Spiner from './Spiner';
import { Redirect } from 'react-router-dom';
async function getReview(){
    let response = await fetch('https://credit-bank-practice.herokuapp.com/getUserComments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
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
let myReviewsArrayFetch =  localStorage.getItem('token') ? wrapPromise(getReview()) : null;
export default (props) => {
    if(!myReviewsArrayFetch)
        return <Redirect to='/'/>
    const { appLanguage } = useContext(AppLanguage);
    const {user} = useContext(User);
    const {proxy} = useContext(Proxy);
    const [myReviewsArray, setMyReviewsArray] = useState(myReviewsArrayFetch.read());
    useEffect(()=>{
        return ()=> myReviewsArrayFetch.read = ()=>myReviewsArray;
    });
    async function deleteReview(removedId) {
        const newArray = myReviewsArray.filter(value => removedId !== value.id);
        setMyReviewsArray(newArray);
        let response = await fetch(proxy+'/deleteComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({'id':removedId})
        });
        let json = await response.json()
    }
    async function sendEditReview(reviewId,newText) {
        setMyReviewsArray(myReviewsArray.map(value=>{
            if(value.id === reviewId)
                value.text = newText;
            return value;
        }));
        let response = await fetch(proxy+'/updateComments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                'id':reviewId,
                'text':newText,
            })
        });
    } 
    function addReview(newReview) {
        let newArray = myReviewsArray.slice();
        newArray.unshift(newReview)
        setMyReviewsArray(newArray);
    }
    if(!user.email){
        return (<Spiner/>)
    }
    return (
        <>
        <div className='give-review-wrapper p-0 container-fluid'>
            <div className='container p-0'>
                <div className='jumbotron mb-0 p-0 give-review rounded-0 '>
                    <h2 className='text-center p-sm-3 p-1 m-0 mb-sm-2 give-review-title title'>{appLanguage === 'eng' ? 'My reviews' : 'Мої відгуки'}</h2>
                </div>
                <UserGiveReviewImputField addReview={addReview}/>
            </div>
        </div>
       <UserLastReviews myReviewsArray={myReviewsArray} deleteReview={deleteReview} sendEditReview={sendEditReview}/>
        </>
    )
}