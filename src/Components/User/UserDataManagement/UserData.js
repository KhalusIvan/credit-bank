import React, { useContext } from 'react';
import AppLanguage from '../../../Contexts/AppLanguage';
import AvatarConstructor from '../../AvatarImg/AvatarConstructor';
import '../../../style/userAcc.css';
import User from '../../../Contexts/User';
import Spiner from '../../Spiner';
export default (props) => {
    const { appLanguage } = useContext(AppLanguage);
    const {user} = useContext(User); 
    if(!user.email)
        return <Spiner/>
    return (
        <div className='d-flex align-items-start mt-2 mb-4'>
            <div className='userAvatar flex-shrink-0' style={user.avatar ? { backgroundImage: `url(${URL.createObjectURL(new Blob([new Uint8Array(user.avatar.data)]))})` }:null}></div>
            <div className='user-data d-dlex justify-content-between flex-column p-0'>
                <div className='d-flex flex-column flex-sm-row user-name '>
                    <div className='userFirstName m-0 ml-md-2 mr-1'>{user['first_name']}</div>
                    <div className='userSecondName m-0 ml-md-2 mr-1'>{user['second_name']}</div>
                </div>
                <div className='user-email m-0 ml-md-2 text-muted '>{user.email}</div>
                <div className='user-role mt-0 mt-md-1 ml-md-2 text-muted'>{user.phone ?  user.phone : user.role}</div>
                <div className='user-role mt-0 mt-md-1 ml-md-2 text-muted text-nowrap'>{user.credit_card ? user.credit_card.replace(/(\d)(?=(\d{4})+(\D|$))/g, '$1-'):''}</div>
                <div className='change-user-avatar m-0 ml-md-2 mt-1 text-muted'><button data-toggle="modal" data-target="#changeAvatar" className='btn btn-dark'>{appLanguage === 'eng' ? 'Change image' : 'Змінити фото'}</button></div>
            </div>
            <AvatarConstructor />
        </div>
    )
}