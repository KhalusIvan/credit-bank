import React, { useContext } from 'react';
import AppLanguage from '../Contexts/AppLanguage';
import AvatarConstructor from './AvatarImg/AvatarConstructor';
import '../style/userAcc.css';
import { Redirect } from 'react-router-dom';

async function getUserData() {
    let response = await fetch('https://credit-bank-practice.herokuapp.com/getData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
    let result = await response.json();
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
const userData = localStorage.getItem('token') ? wrapPromise(getUserData()) : null;
export default (props) => {
    if(!userData){
        return <Redirect to='/'/>
    }
    const { appLanguage } = useContext(AppLanguage);
    console.log(userData.read());
    const user = userData.read();
    let arr = new Uint8Array(userData.read().avatar);
    let blob = new Blob([arr]);
    return (
        <div className='d-flex align-items-start mt-2 mb-4'>
            <div className='userAvatar flex-shrink-0' style={blob.size > 0 ? { backgroundImage: `url(${URL.createObjectURL(blob)})` }:null}></div>
            <div className='user-data d-dlex justify-content-between flex-column p-0'>
                <div className='d-flex flex-column flex-sm-row user-name '>
                    <div className='userFirstName m-0 ml-md-2 mr-1'>{user['first_name']}</div>
                    <div className='userSecondName m-0 ml-md-2 mr-1'>{user['second_name']}</div>
                </div>
                <div className='user-email m-0 ml-sm-2 text-muted '>{user.email}</div>
                <div className='user-role m-0 ml-sm-2 text-muted'>{user.role}</div>
                <div className='change-user-avatar m-0 ml-sm-2 mt-1 text-muted'><button data-toggle="modal" data-target="#changeAvatar" className='btn btn-dark'>{appLanguage === 'eng' ? 'Change image' : 'Змінити фото'}</button></div>
            </div>
            <AvatarConstructor />
        </div>
    )
}