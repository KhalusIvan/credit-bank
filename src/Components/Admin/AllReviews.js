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
                            <AdminReview changeEmail={changeEmail} changeReview={changeReview} id='1' email='f@dd@' idOfModal={idOfModal} first_name='Bogdan' second_name='Seredenko' text='Цей сайт деплоївся 52 рази... Поки що працює: можливість реєстрації, автентифікації,підтвердження емейлу, зміна даних акаунту та додавання, видалення, зміна коментарів, додавання паспорту, банківської картки та номеру телефона. Відтепер можна переглядати та брати доступні кредити. Поки що немає перевірки паспорта. Це буде додано в наступних релізах...' date='2 days ago' avatar={null} />
                            <AdminReview changeEmail={changeEmail} changeReview={changeReview} id='2' email='f@ddfd@' idOfModal={idOfModal} first_name='Bogdan' second_name='Seredenko' text='Nice service!' date='2 days ago' avatar={null} />

                            <AdminReview changeEmail={changeEmail} changeReview={changeReview} id='3' email='f@fgdd@' idOfModal={idOfModal} first_name='Bogdan' second_name='Seredenko' text='Nice service!' date='2 days ago' avatar={null} />
                            <AdminReview changeEmail={changeEmail} changeReview={changeReview} id='4' email='f@sradd@' idOfModal={idOfModal} first_name='Bogdan' second_name='Seredenko' text='Nice s rv fgh dsfhg sdfg sdfhg hdsf iwuegf qpcpqwcn vus rv fgh dsfhg sdfg sdfhg hdsf iwuegf qpcpqwcn vuserv fgh dsfhg sdfg sdfhg hdsf iwuegf qpcpqwcn vusa dsggadhpawe awoudh skdjfh we rsfaice!' date='2 days ago' avatar={null} />
                            <AdminReview changeEmail={changeEmail} changeReview={changeReview} id='5' email='f@d4d@' idOfModal={idOfModal} first_name='Bogdan' second_name='Seredenko' text='Nice service!' date='2 days ago' avatar={null} />

                            <AdminReview changeEmail={changeEmail} changeReview={changeReview} id='6' email='f@ddsfgd@' idOfModal={idOfModal} first_name='Bogdan' second_name='Seredenko' text='Nice service!' date='2 days ago' avatar={null} />

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
