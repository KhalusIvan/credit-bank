import React from 'react';
import Logo from './Logo';
import '../style/jumbotronSeparator.css';
export default ()=>{
    return(
        <div className='container-fluid p-0 m-0 jumbotron-separator'>
            <div className='container d-flex align-items-center justify-content-center pb-4 pt-4'>
                <div className='separator-text'>
                    Ukraine
                    <Logo/>
                    Credit
                </div>
            </div>
        </div>
    )
}