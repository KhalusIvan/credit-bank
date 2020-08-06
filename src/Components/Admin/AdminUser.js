import React, { useContext } from 'react';
import AppLanguage from '../../Contexts/AppLanguage.js';
import '../../style/adminUser.css';
export default (props) => {
    const { appLanguage } = useContext(AppLanguage);
    function removePhoto() {
        props.changeCurrentUser(props.email);
        props.changeScope('delete_photo');
    }
    function deleteUser() {
        props.changeCurrentUser(props.email);
        props.changeScope('delete_user');
    }
    function writeEmail() {
        props.changeCurrentUser(props.email);
        props.changeScope('write_email');
    }
    return (
        <div className={`admin-user-item ${props.status.toLowerCase()}`} >
            <div className='admin-user-title'>
                <div className='user-data'>
                    <div className='avatar flex-shrink-0' style={{ backgroundImage: props.avatar ? props.avatar : '' }}></div>
                    <div className='user-name'>{props.first_name + " " + props.second_name}</div>
                </div>
                <div className='admin-user-status text-center'>{props.status}</div>
            </div>
            <div className='admin-user-body'>
                <div className='user-document-data row'>
                    <div className='col-12 col-sm-7'>
                        <div className='user-email'>{appLanguage === 'eng' ? 'Email: ' : 'Емайл: '}{props.email}</div>
                        <div className='user-phone'>{appLanguage === 'eng' ? 'Phone: ' : 'Телефон: '}{props.phone}</div>
                        <div className='user-credit'>{appLanguage === 'eng' ? 'Credit card: ' : 'Кредитна картка: '}{props.credit_card.replace(/(\d)(?=(\d{4})+(\D|$))/g, '$1-')}</div>
                    </div>
                    <div className='col-12 col-sm-5'>
                        <div className='user-all-credits'>{appLanguage === 'eng' ? 'All credits: ' : 'Всі кредити: '}{props.all_credits}</div>
                        <div className='user-all-credits'>{appLanguage === 'eng' ? 'Active credits: ' : 'Активні кредити: '}{props.active_credits}</div>
                        <div className='user-all-credits'>{appLanguage === 'eng' ? 'Expired credits: ' : 'Заборговані кредити: '}{props.expired_credits}</div>
                        <div className='user-all-credits'>{appLanguage === 'eng' ? 'Closed credits: ' : 'Закриті кредити: '}{props.closed_credits}</div>
                    </div>
                </div>
            </div>
            <div className='admin-user-toolbar'>
                <button onClick={removePhoto} data-toggle='modal' data-target={'#'+props.idOfModal} className='btn btn-dark text-nowrap'>{appLanguage === 'eng' ? 'Remove photo' : 'Видалити фото'}</button>
                <button onClick={deleteUser} data-toggle='modal' data-target={'#'+props.idOfModal} className='btn btn-dark text-nowrap'>{appLanguage === 'eng' ? 'Delete user' : 'Видалити користувача'}</button>
                <button onClick={writeEmail} data-toggle='modal' data-target={'#'+props.idOfModal} className='btn btn-dark text-nowrap'>{appLanguage === 'eng' ? 'Write email' : 'Написати емейл'}</button>
            </div>
        </div>
    )
}