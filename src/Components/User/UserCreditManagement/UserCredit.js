import React, { useContext, useEffect, useState } from 'react';
import NotVerificatedUserMessage from '../NotVerificatedUserMessage.js';
import UserMyCredits from './MyCredits/UserMyCredits.js';
import UserTakeCredits from './TakeCredit/UserTakeCredits';
import User from '../../../Contexts/User.js';
import JumbotronSeparator from '../../JumbotronSeparator.js';
import { wrapPromise } from '../../../script/custom.js';
import { Redirect } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
async function getAllCredits() {
    let response = await fetch('https://credit-bank-practice.herokuapp.com/getCreditsTypes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
    let result = await response.json();
    return await result;
}
async function getMyCredits() {
    let response = await fetch('https://credit-bank-practice.herokuapp.com/getUsersCredits', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
    let result = await response.json();
    const res = result.map(value => {
        value.start_date = new Date(value.start_date);
        value.end_date = new Date(value.end_date);
        return value;
    });
    return await res;
}
let allCreditsArrayFetch = localStorage.getItem('token') ? wrapPromise(getAllCredits()) : null;
let myCreditsArrayFetch = localStorage.getItem('token') ? wrapPromise(getMyCredits()) : null;
export default (props) => {
    if (!myCreditsArrayFetch)
        return <Redirect to='/' />
    const { user } = useContext(User);
    const [myCredits, setMyCredits] = useState(myCreditsArrayFetch.read());
    useEffect(() => {
        return () => myCreditsArrayFetch.read = () => myCredits;
    });
    function addCredit(newCredit) {
        const newArray = myCredits.slice();
        newCredit.start_date = new Date(newCredit.start_date);
        newCredit.end_date = new Date(newCredit.end_date);
        newArray.unshift(newCredit)
        setMyCredits(newArray);
    }
    return (
        <Fade>
            <div className='container-fluid p-0 user-credit-wrapper'>
                {user['is_checked'] ? '' : <NotVerificatedUserMessage />}
                <UserMyCredits creditsArray={myCredits} />
                <JumbotronSeparator />
                <UserTakeCredits addCredit={addCredit} creditsArray={allCreditsArrayFetch.read()} />
            </div>
        </Fade>
    )
}
