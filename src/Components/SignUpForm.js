import React, { useContext, useRef, useState } from 'react';
import AppLanguage from '../Contexts/AppLanguage.js';
import User from '../Contexts/User.js';
import '../style/signUpForm.css';
import {
    BrowserRouter as Router,
    Redirect,
    withRouter
  } from "react-router-dom";
import Proxy from '../Contexts/Proxy.js';
function SignUpForm (props)  {
    const appLanguage = useContext(AppLanguage).appLanguage;
    const firstName = useRef(null);
    const secondName = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const {proxy} = useContext(Proxy);
    const [isValidForm, setIsValidForm] = useState(false);
    const [isSending, setIsSending] = useState(false);
    function returnStateOfField(e) {
        if(e.target.value.length === 0){
            e.target.classList.remove('valid');
            e.target.classList.remove('invalid');
        }
    }
    function validateName(e) {
        let regex = /^[A-Z][a-z']+?([-`']{1}[A-Z]{1}[a-z']+?)?$|^[А-ЯІЇ][а-яії']+?([-`']{1}[А-ЯІЇ]{1}[а-яії']+?)?$/u;
        if(e.target.value.length !== 0){
            if(regex.test(e.target.value) && e.target.value.length <= 20){
                e.target.classList.add('valid');
                e.target.classList.remove('invalid');
            }
            else{
                e.target.classList.add('invalid');
                e.target.classList.remove('valid');
            }
        }
    }
    function validateEmail(e) {
        let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(e.target.value.length !== 0){
            if(regex.test(e.target.value)){
                e.target.classList.add('valid');
                e.target.classList.remove('invalid');
            }
            else{
                e.target.classList.add('invalid');
                e.target.classList.remove('valid');
            }
        }
    }
    function validatePassword(e) {
        let regex = /^[a-zA-Zа-яА-ЯіїІЇ0-9][a-zA-Zа-яА-Яії0-9]{7,20}$/u;
        if(e.target.value.length !== 0){
            if(regex.test(e.target.value)){
                e.target.classList.add('valid');
                e.target.classList.remove('invalid');
            }
            else{
                e.target.classList.add('invalid');
                e.target.classList.remove('valid');
            }
        }
    }
    function checkForm(e) {
        returnStateOfField(e);
        checkAllField();
    }
    function checkAllField(){
        const isValidForm = firstName.current.classList.contains('valid') && secondName.current.classList.contains('valid') && email.current.classList.contains('valid') && password.current.classList.contains('valid') ;
        setIsValidForm(isValidForm);
    }
    async function formSubmit(e){
        e.preventDefault();
        setIsSending(true);
        let resp = await fetch(proxy+'/register',{
            method: 'POST',
            body: new FormData(e.target)
        });
        let json = await resp.json()
        console.log(await json);
        if(await json.token){
            localStorage.setItem('token',json.token);
            props.onSubmitFunction();
            document.location.reload();
            props.history.push('/');
        }     
    }
    return (
        <form className='signUpForm' onSubmit={formSubmit}>
            <div className="input-group">
                <input type="text" autoComplete='off' maxLength='20' ref={firstName} onChange={(e)=>{validateName(e);checkForm(e)}} className="form-control" name='first_name' placeholder={appLanguage === 'eng'? 'First name': "Ім'я" }/>
                <small className="form-text form-helper first-name-helper">{appLanguage === 'eng' ? "First and Second name must be 2-20 characters long and free of spaces, special characters (except - '), or smilies":"Ім'я і Прізвище повинно мати довжину 2-20 символів і не містити пробілів, спеціальних символів (окрім -') або смайлів"}</small>
            </div>
            <div className="input-group">
                <input type="text" autoComplete='off' ref={secondName} onChange={(e)=>{validateName(e);checkForm(e)}} className="form-control" name='second_name' placeholder={appLanguage === 'eng'? 'Second name': 'Прізвище' } />
                <small className="form-text form-helper second-name-helper"></small>
            </div>
            <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                    <div className="input-group-text">@</div>
                </div>
                <input type="text" autoComplete='off' ref={email} onChange={(e)=>{validateEmail(e);checkForm(e)}} className="form-control" placeholder={appLanguage === 'eng'? "Email": 'Емейл' } name='email' />
                <small className="form-text form-helper email-helper"></small>
            </div>
            <div className="input-group">
                <input type="password" ref={password} onChange={(e)=>{validatePassword(e);checkForm(e)}} className="form-control" name='password' placeholder={appLanguage === 'eng'? "Password": 'Пароль' }  />
                <small className="form-text form-helper password-helper">{appLanguage === 'eng' ? 'Your password must be 8-20 characters long and must not contain spaces, special characters, or emoji':
                    'Ваш пароль повинен бути довжиною 8-20 символів і не повинен містити пробілів, спеціальних символів або смайлів'
                }</small>
            </div>
            <div className='d-flex justify-content-end'>
                <button type="submit" disabled={!isValidForm || isSending} className="btn btn-dark ml-auto btn-submit">{isSending ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : appLanguage === 'eng' ? "Submit" : 'Відправити'}</button>
            </div>
        </form>
    )
}
export default withRouter(SignUpForm);