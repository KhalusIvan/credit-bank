import React, { useContext, useEffect } from 'react';
import AppLanguage from '../../../Contexts/AppLanguage';
import UserData from './UserData';
import ChangeUserData from './ChangeUserData.js';
import ChangeUserPassword from './ChangeUserPassword.js';
import ChangeCreditData from './ChangeCreditData';
import Fade from 'react-reveal/Fade';
import '../../../style/userAcc.css'
import { useParams,useHistory } from 'react-router-dom';
import User from '../../../Contexts/User';
export default (props) => {
    const { userName } = useParams();
    const {user} = useContext(User);
    const history = useHistory();
    const { appLanguage } = useContext(AppLanguage);
    useEffect(()=>{
        if(user.email)
            if(userName !== props.userNameInUrl){
                history.push('/user');
            }
    },[user.email, userName, props.userNameInUrl]);
    return (
        <Fade>
            <div className='userAcc-wrapper p-0 container-fluid'>
                <div className='container p-0'>
                    <div className='jumbotron mb-0 userAcc rounded-0 '>
                        <h2 className='text-center p-sm-3 p-1 m-0 mb-sm-2 userAcc-title title'>{appLanguage === 'eng' ? 'Personal office' : 'Особистий кабінет'}</h2>
                        <div className='row ml-0 mr-0 mt-4 mb-3'>
                            <div className='col-12 col-md-8'>
                                <UserData />
                            </div>
                            <div className='col-12 col-md-4 d-none d-md-block empty-space'>
                            </div>
                        </div>
                        <div className='row change-data-wrapper ml-0 mr-0 justify-content-around'>
                            <div className='col-12 col-sm-12 col-md-5 mb-3 mt-2'>
                                <ChangeUserData />
                            </div>
                            <div className='col-12 col-sm-12 col-md-7 col-lg-6 mb-3 mt-2'>
                                <ChangeUserPassword />
                            </div>
                            <div className={`col-12 col-sm-12 col-md-7 col-lg-6 mb-3 mt-2 ${user.email?'':'d-none'}`}>
                                <ChangeCreditData />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    )
}