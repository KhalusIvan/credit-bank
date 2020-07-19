import React, { useContext } from 'react';
import Logo from './Logo';
import '../style/jumbotronSeparator.css';
export default ()=>{
    return(
        <div className='container-fluid p-0 m-0 jumbotron-separator'>
            <div className='container'>
                <Logo/>
            </div>
        </div>
    )
}