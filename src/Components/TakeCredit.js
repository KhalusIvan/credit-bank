import React from 'react';
import { useRouteMatch, useParams } from 'react-router-dom';
export default (props)=>{
    let { path, url} = useRouteMatch();
    let { id } = useParams();
    console.log(document.location.pathname);
    return(
        <div>TakeCredit</div>
    )
}