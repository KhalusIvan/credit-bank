import React, { useContext, useRef } from 'react';
import AppLanguage from '../../Contexts/AppLanguage';
import { CSSTransitionGroup } from 'react-transition-group'
import UserLastReviewsReviev from './UserLastReviewsReview.js';
import Logo from '../Logo';
import '../../style/userLastReviews.css';
import User from '../../Contexts/User';
export default (props) => {
    const idOfModal = 'rewiewEditModal';
    const textareaOfModal = useRef(null);
    const { appLanguage } = useContext(AppLanguage);
    const {user} = useContext(User);
    let idOfChangedReview = null;
    function editReview(editedId) {
        for (let value of props.myReviewsArray) {
            if (value.id === editedId) {
                textareaOfModal.current.value = value.text;
                idOfChangedReview = editedId;
                break;
            }
        }
    }
    const closeModalButton = useRef(null);
    function closeModal() {
        if (closeModalButton.current)
            closeModalButton.current.click();
        return;
    }
    return (
        <div className='user-last-reviews-wrapper container-fluid pt-md-3 pb-md-3 pt-1 pb-1 pr-0 pl-0 pr-sm-2 pl-sm-2'>
            <div className='container user-last-reviews mb-md-3 mt-md-3 mt-1 mb-1'>
                <h3 className='user-last-reviews-title'>{appLanguage === 'eng' ? 'Last reviews' : 'Останні відгуки'}</h3>
                <CSSTransitionGroup className='user-last-reviews-reviews reviews row m-0  pb-1 pt-1 pb-md-4 pt-md-3 d-bock'
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {props.myReviewsArray.map(value => (<UserLastReviewsReviev editReview={editReview} idOfModal={idOfModal} deleteReview={props.deleteReview} avatar={user.avatar ? `url(${URL.createObjectURL(new Blob([new Uint8Array(user.avatar.data)]))})`:false} key={value.id} name={value.name} text={value.text} date={value.date} id={value.id} />))}
                </CSSTransitionGroup>
            </div>
            <div className="modal fade signForm p-0" id={idOfModal} tabIndex="-1" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <Logo />
                            <button ref={closeModalButton} type="button" className="close p-0 mt-1" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className='modal-body form-group'>
                            <textarea className='edit-review-textarea form-control p-3 rounded' rows='8' ref={textareaOfModal}></textarea>
                        </div>
                        <div className='modal-footer'>
                            <button className='btn btn-primary' onClick={()=>{props.sendEditReview(idOfChangedReview,textareaOfModal.current.value);closeModal();}}>{appLanguage === 'eng' ? 'Edit' : ' Змінити'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}