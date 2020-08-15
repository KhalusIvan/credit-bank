import React, { useEffect, useContext, useState, useRef } from 'react';
import Fade from 'react-reveal/Fade';
import Proxy from '../../Contexts/Proxy.js';
import AppLanguage from '../../Contexts/AppLanguage.js';
import Pagination from '../Pagination';
import '../../style/adminAllUsers.css';
import '../../style/button-panel.css';
export default (props) => {
    const { appLanguage } = useContext(AppLanguage);
    const { proxy } = useContext(Proxy);
    return (
        <Fade>
            <div className='container-fluid p-0 admin-all-credits-wrapper'>
                <div className='container admin-all-credits'>
                    
                </div>
            </div>
        </Fade>
    )
}
