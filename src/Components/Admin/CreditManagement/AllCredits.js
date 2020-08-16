import React, { useEffect, useContext, useState, useRef } from 'react';
import Fade from 'react-reveal/Fade';
import Proxy from '../../../Contexts/Proxy.js';
import AppLanguage from '../../../Contexts/AppLanguage.js';
import Pagination from '../../Pagination';
import '../../../style/adminAllCredits.css';
import AddCredit from './AddCredit.jsx';
export default (props) => {
    const { appLanguage } = useContext(AppLanguage);
    const { proxy } = useContext(Proxy);
    return (
        <Fade>
            <div className='container-fluid p-0 admin-all-credits-wrapper'>
                <div className='container admin-all-credits'>
                    <div className="jumbotron p-1 p-xm-2 p-sm-4 p-lg-5 m-0 rounded-0 bg-transparent">
                        <h2 className='text-center p-sm-3 p-1 m-0 mb-sm-2 admin-all-credits-title title'>{appLanguage === 'eng' ? 'Add credit' : 'Додати кредит'}</h2>
                        <AddCredit/>
                    </div>
                </div>
            </div>
        </Fade>
    )
}
