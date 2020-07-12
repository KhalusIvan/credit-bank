import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useRouteMatch,
    useParams
  } from "react-router-dom";
export default (props)=>{
    if(props.role === 'guest')
        return <Redirect to={'/guest'}/>
    else if(props.role === 'user')
        return <Redirect to={'/user'}/>
    return <div></div>
}