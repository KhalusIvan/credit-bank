import React, { useContext } from 'react';
import AppLanguage from '../../Contexts/AppLanguage.js';
import '../../style/adminUser.css';
export default (props) => {
    const { appLanguage } = useContext(AppLanguage);
    function removePhoto() {
        props.changeCurrentUser(props.email);
        props.setCurrentArray();
        props.changeScope('delete_photo');
    }
    function deleteUser() {
        props.changeCurrentUser(props.email);
        props.changeScope('delete_user');
        props.setCurrentArray();
    }
    function writeEmail() {
        props.changeCurrentUser(props.email);
        props.setCurrentArray();
        props.changeScope('write_email');
    }
    function checkUser() {
        props.checkUser(props.email);
    }
    function notCheckUser() {
        props.changeCurrentUser(props.email);
        props.setCurrentArray();
        props.changeScope('not_check_user');
    }
    function showPassport() {
        if (!props.passport) return;
        props.changeCurrentUser(props.email);
        props.changeScope('show_passport');
        props.setPassport(props.passport);
        props.setCurrentArray();
    }
    return (
        <div className={`admin-user-item ${props.state ? props.state : props.status.toLowerCase()}`} >
            {props.state ? <div className='deletedUser'></div> : null}
            <div className='admin-user-title'>
                <div className='user-data'>
                    <div className='avatar flex-shrink-0' style={props.avatar ? props.avatar.data.length ? { backgroundImage: `url(${URL.createObjectURL(new Blob([new Uint8Array(props.avatar.data)]))})` } : null : null}></div>
                    <div className='user-name'>{props.first_name + " " + props.second_name}</div>
                </div>
                <div className='admin-user-status text-center'>{props.state ? props.state : props.status}</div>
            </div>
            <div className='admin-user-body'>
                <div className='user-document-data row'>
                    <div className='col-12 col-sm-7'>
                        <div className='user-email'>{appLanguage === 'eng' ? 'Email: ' : '??????????: '}{props.email}</div>
                        <div className='user-phone'>{appLanguage === 'eng' ? 'Phone: ' : '??????????????: '}{props.phone ? props.phone : '------'}</div>
                        <div className='user-credit'>{appLanguage === 'eng' ? 'Credit card: ' : '???????????????? ????????????: '}{props.credit_card ? props.credit_card.replace(/(\d)(?=(\d{4})+(\D|$))/g, '$1-') : '------'}</div>
                        {!props.state ?
                            <div className='not-checked-toolbar'>
                                <button onClick={showPassport} disabled={!props.passport} data-toggle='modal' data-target={'#' + (props.passport ? props.idOfModal : '')} className='btn btn-secondary passport-loader text-nowrap'>{props.passport ? appLanguage === 'eng' ? 'Passport' : '??????????????' : props.passport === undefined ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : props.passport === null ? appLanguage === 'eng' ? 'Passport is not loaded' : '?????????????? ???? ??????????????????????' : ''}</button>
                                {props.status === 'NotChecked' && (props.passport === null || props.passport) ? <>
                                    <button onClick={checkUser} className='btn btn-primary text-nowrap'>{appLanguage === 'eng' ? 'Confirm data' : '?????????????????????? ????????'}</button>
                                    <button onClick={notCheckUser} data-toggle='modal' data-target={'#' + props.idOfModal} className='btn btn-danger text-nowrap'>{appLanguage === 'eng' ? 'Refute data' : '?????????????????????? ????????'}</button>
                                </> : ''}
                            </div> : null
                        }
                    </div>
                    <div className='col-12 col-sm-5'>
                        <div className='user-all-credits'>{appLanguage === 'eng' ? 'All credits: ' : '?????? ??????????????: '}{props.all_credits}</div>
                        <div className='user-all-credits'>{appLanguage === 'eng' ? 'Active credits: ' : '?????????????? ??????????????: '}{props.active_credits}</div>
                        <div className='user-all-credits'>{appLanguage === 'eng' ? 'Expired credits: ' : '?????????????????????? ??????????????: '}{props.expired_credits}</div>
                        <div className='user-all-credits'>{appLanguage === 'eng' ? 'Closed credits: ' : '?????????????? ??????????????: '}{props.closed_credits}</div>
                    </div>
                </div>
            </div>
            {!props.state && (props.passport === null || props.passport) ?
                <div className='admin-user-toolbar'>
                    <button onClick={removePhoto} data-toggle='modal' data-target={'#' + props.idOfModal} className='btn btn-dark text-nowrap'>{appLanguage === 'eng' ? 'Remove photo' : '???????????????? ????????'}</button>
                    <button onClick={deleteUser} data-toggle='modal' data-target={'#' + props.idOfModal} className='btn btn-dark text-nowrap'>{appLanguage === 'eng' ? 'Delete user' : '???????????????? ??????????????????????'}</button>
                    <button onClick={writeEmail} data-toggle='modal' data-target={'#' + props.idOfModal} className='btn btn-dark text-nowrap'>{appLanguage === 'eng' ? 'Write email' : '???????????????? ??????????'}</button>
                </div> : null
            }
        </div>
    )
}