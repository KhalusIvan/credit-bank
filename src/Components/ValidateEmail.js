import React, { useContext, useState, useEffect } from 'react';
import Proxy from '../Contexts/Proxy';
import {
    Redirect,useParams,useHistory
  } from "react-router-dom";
export default function ValidateEmail(props) {
    const { token } = useParams();
    const {proxy} = useContext(Proxy);
    const history = useHistory()
    const [isValidToken,setIsValidToken] = useState(false);
    console.log(token);
    async function fetchData() {
      let resp = await fetch(proxy + '/checkUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
      const json = await resp.json();
      console.log(json);
      if (json.role === 'user') {
          localStorage.setItem('token',token);
          history.push('/user');
          setIsValidToken(true);
      }
    }
    useEffect(()=>{
        fetchData();
    },[])
    return (<h1>Loading...</h1>)
  }