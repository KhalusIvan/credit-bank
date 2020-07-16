import React, { useContext, Suspense, useState, useEffect } from 'react';
import AppLanguage from '../Contexts/AppLanguage';
import UserGiveReviewImputField from './UserGiveReviewImputField.js';
import UserLastReviews from './UserLastReviews.js';
let myReviewsArrayFetch = [
    { name: 'Alexandr Kovalechenko', text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remain", time: '2 days ago', id: 1 },
    { name: 'Alexandr Kovalechenko', text: "Lorem Ipsum is simply dummard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remain", time: '12 days ago', id: 2 },
    { name: 'Alexandr Kovalechenko', text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a tut also the leap into electronic typesetting, remain", time: '8 days ago', id: 3 },
    { name: 'Alexandr Kovalechenko', text: "Lorem Ipsusince the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into elg, remain", time: '6 days ago', id: 4 },
    { name: 'Alexandr Kovalechenko', text: "Loremnot only five centuries, but also the leap into electronic typesetting, remain", time: '8 days ago', id: 5 }
]
export default (props) => {
    const { appLanguage } = useContext(AppLanguage);
    const [myReviewsArray, setMyReviewsArray] = useState(myReviewsArrayFetch);
    function deleteReview(removedId) {
        const newArray = myReviewsArray.filter(value => removedId !== value.id);
        setMyReviewsArray(newArray);
    }
    function sendEditReview(reviewId,newText) {
        setMyReviewsArray(myReviewsArray.map(value=>{
            if(value.id === reviewId)
                value.text = newText;
            return value;
        }));
    } 
    function addReview(newText) {
        let newArray = myReviewsArray.slice();
        newArray.unshift({ name: 'Alexandr Kovalechenko', text: newText, time: 'justNow', id: newText })
        setMyReviewsArray(newArray);
    }
    console.log(myReviewsArray);
    useEffect(()=>{
        return ()=>myReviewsArrayFetch=myReviewsArray;
    })
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