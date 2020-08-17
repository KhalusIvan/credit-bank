import React, { useContext } from 'react';
import AppLanguage from '../../Contexts/AppLanguage.js';
import '../../style/adminReviews.css';
export default (props) => {
    const { appLanguage } = useContext(AppLanguage);
    function removeReview() {
        props.changeEmail(props.email);
        props.changeReview(props.id);
    }
    return (
        <div className='admin-review-item'>
            <div className='admin-review-title'>
                <div className='user-data'>
                    <div className='avatar flex-shrink-0' style={props.avatar ? props.avatar.data.length ? { backgroundImage: `url(${URL.createObjectURL(new Blob([new Uint8Array(props.avatar.data)]))})` } : null : null}></div>
                    <div className='user-name'>{props.name}</div>
                </div>
                <div className='text-center'>{props.status}</div>
            </div>
            <div className='admin-review-body'>
                <div className='review-text'>
                    {props.text}
                </div>
            </div>
            <div className='admin-review-footer'>
                <div className='review-date text-muted'>{props.date}</div>
                <div className='admin-review-toolbar'>
                    <button onClick={removeReview} data-toggle='modal' data-target={'#' + props.idOfModal} className='btn btn-dark text-nowrap'>{appLanguage === 'eng' ? 'Remove review' : 'Видалити відгук'}</button>
                </div>
            </div>
        </div>
    )
}
