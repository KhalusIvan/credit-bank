import React, { useContext, Suspense, useRef } from 'react';
import AppLanguage from '../Contexts/AppLanguage';
import '../style/userAcc.css';
async function getUserData() {
    let response = await fetch('https://testservere.herokuapp.com/getFile', {
        method: 'POST'
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
const userData = wrapPromise(getUserData());
export default (props) => {
    const { appLanguage } = useContext(AppLanguage);
    let arr = new Uint8Array(userData.read().data);
    let blob = new Blob([arr]);
    return (
        <div className='d-flex align-items-start'>
            <div className='userAvatar flex-shrink-0' style={{ backgroundImage: `url(${URL.createObjectURL(blob)})` }}></div>
            <div className='user-data d-dlex justify-content-between flex-column p-0'>
                <div className='d-flex flex-column flex-sm-row user-name '>
                    <div className='userFirstName m-0 ml-md-2 mr-1'>Alexander</div>
                    <div className='userSecondName m-0 ml-md-2 mr-1'>Kovalechenko</div>
                </div>
                <div className='user-email m-0 ml-sm-2 text-muted'>someemail99@gmail.com</div>
                <div className='user-role m-0 ml-sm-2 text-muted'>Simpe User</div>
                <div className='change-user-avatar m-0 ml-sm-2 mt-1 text-muted'><button className='btn btn-dark'>Змінити фото</button></div>
            </div>
        </div>
    )
}