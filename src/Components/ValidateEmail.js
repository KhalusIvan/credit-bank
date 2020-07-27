import React, { useContext, useState, useEffect } from 'react';
import Proxy from '../Contexts/Proxy';
import {
    Redirect,useParams
  } from "react-router-dom";
export default function ValidateEmail() {
    const { token } = useParams();
    const {proxy} = useContext(Proxy);
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
      if (json.status === 'ok') {
          localStorage.setItem('token',token);
          setIsValidToken(true);
      }
    }
    useEffect(()=>{
        fetchData();
    },[])
    if(isValidToken)
        return (
            <Redirect to='/user'/>
        );
    else return (<h1>Loading...</h1>)
  }