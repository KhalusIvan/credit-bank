import React, { useContext, useState, useEffect } from 'react';
import Proxy from '../Contexts/Proxy';
import {
  Redirect, useParams, useHistory
} from "react-router-dom";
export default function ValidateEmail(props) {
  const { token } = useParams();
  const { proxy } = useContext(Proxy);
  const history = useHistory();
  const [isValidUser, setIsValidUser] = useState(false);
  const [counter, setCounter] = useState(5);
  async function fetchData() {
    let resp = await fetch(proxy + '/checkUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    });
    const json = await resp.json();
    if (json.role === 'user') {
      localStorage.setItem('token', token);
      setIsValidUser(true);
    }
    else{
      history.push('/');
    } 
  }
  useEffect(()=>{
    if(setIsValidUser){
      setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
    }
    if(counter === 0){
      history.push('/user');
      window.location.reload();
    }
  },[isValidUser,counter])
  useEffect(() => {
    fetchData();
  }, []);
  return (<div className='tokenPage'>
    <div class="spiner-token-page m-4 spinner-border text-light" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <h1 className={`token-title text-center ${isValidUser ? '' : 'd-none'}`}>Ваш аккаунт вже підтверджено</h1>
    <h4 className={`token-text text-center ${isValidUser ? '' : 'd-none'}`}>Переадресація на особистий кабінет через {counter}</h4>
  </div>)
}