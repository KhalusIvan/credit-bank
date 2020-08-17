import React, { useContext, useRef, useState } from 'react';
import Fade from 'react-reveal/Fade';
import Proxy from '../../Contexts/Proxy.js';
import User from '../../Contexts/User';
import Spiner from '../Spiner.js'
import AppLanguage from '../../Contexts/AppLanguage.js';
import AdminReview from './AdminReview.js';
import Logo from '../Logo';
import Pagination from '../Pagination';
import '../../style/adminReviews.css';
export default (props) => {
    const { appLanguage } = useContext(AppLanguage);
    const { proxy } = useContext(Proxy);
    const idOfModal = 'deleteReviewModal';
    const closeModalButton = useRef(null);
    const textareaOfModal = useRef(null);
    const [currentReview, setCurrentReview] = useState();
    const [currentEmail, setCurrentEmail] = useState();
    function changeReview(newReview) {
        setCurrentReview(newReview);
    }
    function changeEmail(newEmail) {
        setCurrentEmail(newEmail);
    }
    return (
        <Fade>
            <div className='container-fluid p-0 admin-all-reviews-wrapper'>
                <div className='container p-0 admin-all-reviews'>
                    <div className="jumbotron p-1 p-xm-2 p-sm-4 p-lg-5 m-0 rounded-0 bg-transparent">
                        <h2 className='text-center p-sm-3 p-1 m-0 mb-sm-2 admin-reviews-title title'>{appLanguage === 'eng' ? 'Reviews' : 'Відгуки'}</h2>
                        <div className='container admin-reviews-list not-reveal'>
                            <Pagination
                                itemId='id'
                                fetchBody={{
                                    lastItems: props.reviewsArray.map(value => {
                                        console.log(value);
                                        if (value) {
                                            return value.lastItem;
                                        } else return undefined;
                                    })
                                }}
                                fetchHeaders={{ 'Authorization': 'Bearer ' + localStorage.getItem('token') }}
                                setExternalArray={props.setReviewsArray}
                                externalArray={props.reviewsArray}
                                render={(reviewsArray) =>
                                    reviewsArray.map((review) => {
                                        return  <AdminReview key={review.id} changeEmail={changeEmail} changeReview={changeReview} id={review.id} email={review.email} idOfModal={idOfModal} name={review.name} text={review.text} date={appLanguage === 'eng' ? review.data_en : review.data_ua} avatar={review.avatar} />
                                    })
                                }
                                numberOfItemsOnPage={props.numOfItemsInPagination}
                                fetchArray={[proxy + '/getAdminComments', proxy + '/getAdminCommentsAvatar']}
                                totalPages={Math.ceil(props.numOfReviews / props.numOfItemsInPagination)}
                                visiblePages={5}
                                currentPage={0}
                                first={appLanguage === 'eng' ? 'First' : 'Початок'}
                                last={appLanguage === 'eng' ? 'Last' : 'Кінець'}
                                whiteList={appLanguage === 'eng' ? 'there is no items' : "тут немає об'єктів"}
                            />
                        </div>
                    </div>
                </div>
                <div className={`modal fade signForm p-0 user-fall-back`} id={idOfModal} tabIndex="-1" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <Logo />
                                <button ref={closeModalButton} type="button" className="close p-0 mt-1" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            {currentReview ?
                                <div className='modal-body text-center'>
                                    <h3 className='admin-all-review-scope-title'>{appLanguage === 'eng' ? 'Why do you want to remove this review?' : 'Чому ви хочете видалити цей відгук?'}</h3>
                                    <div className='form-group'>
                                        <textarea style={{ resize: 'none' }} className='user-fall-back-textarea form-control p-1 p-sm-2 p-md-3 rounded' rows='8' ref={textareaOfModal}></textarea>
                                    </div>
                                    <div className='info text-muted'>
                                        {appLanguage === 'eng' ? 'Your message will be sent to ' : 'Ваше повідомлення буде надіслено на адрес '}{currentEmail}
                                    </div>
                                </div> : ''
                            }
                            <div className={`modal-footer`}>
                                <button className='btn btn-primary' >{appLanguage === 'eng' ? 'Send' : ' Відправити'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    )
}
