import React, { useContext, useState, useEffect,lazy, Suspense } from 'react';
import Proxy from '../Contexts/Proxy';
import {
  useParams, useHistory
} from "react-router-dom";
//import UserMainPage from './User/UserMainPage';
import User from '../Contexts/User';
import Spiner from './Spiner';
const UserMainPage = lazy(()=>import('./User/UserMainPage'))
export default function ValidateEmail(props) {
  const { token } = useParams();
  const { proxy } = useContext(Proxy);
  const history = useHistory();
  const {changeUserRole} = useContext(User);
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
      changeUserRole('user');
      setIsValidUser(true);
    }
    else {
      history.push('/');
    }
  }
  useEffect(() => {
    if (setIsValidUser) {
      setTimeout(() => {
          if(counter === 0){
            return;
          }
          else if(counter < 3)
            window.history.pushState(null,'','/user');
          setCounter(counter - 1);
      }, 1000);
    }
  }, [isValidUser, counter])
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className={`tokenPage ${counter === 0 ? 'd-none' : ''}`}>
        <div className="spiner-token-page m-4 spinner-border text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <h1 className={`token-title text-center ${isValidUser ? '' : 'd-none'}`}>Ваш аккаунт вже підтверджено</h1>
        <h4 className={`token-text text-center ${isValidUser ? '' : 'd-none'}`}>Переадресація на особистий кабінет через {counter}</h4>
      </div>
      <Suspense fallback={<Spiner/>}>
        <UserMainPage/>
      </Suspense>
    </>
  )
}