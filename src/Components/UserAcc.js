import React, { useContext, Suspense } from 'react';
import AppLanguage from '../Contexts/AppLanguage';
import UserData from './UserData.js';
import Spiner from './Spiner';
import '../style/userAcc.css'
export default (props)=>{
    const {appLanguage} = useContext(AppLanguage)
    return(
        <div className='userAcc-wrapper p-0 container-fluid'>
            <div className='container p-0'>
                <div className='jumbotron mb-0 userAcc rounded-0 '>
                    <h2 className='text-center p-sm-3 p-1 m-0 mb-sm-2 userAcc-title title'>{appLanguage === 'eng' ? 'Personal office' : 'Особистий кабінет'}</h2>
                    <div className='row ml-0 mr-0 mt-4 mb-3'>
                        <div className='col-12 col-md-8' style={{zIndex:1}}>
                            <Suspense fallback={<Spiner/>}>
                                <UserData/>
                            </Suspense>
                        </div>
                        <div className='col-12 col-md-4 d-none d-md-block empty-space'>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}