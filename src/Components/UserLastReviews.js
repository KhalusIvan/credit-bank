import React, { useContext, Suspense } from 'react';
import AppLanguage from '../Contexts/AppLanguage';
import Spiner from './Spiner';
import '../style/userLastReviews.css';
export default (props) => {
    const { appLanguage } = useContext(AppLanguage)
    return (
        <div className='user-last-reviews-wrapper container-fluid pt-md-3 pb-md-3 pt-1 pb-1 pr-0 pl-0 pr-sm-2 pl-sm-2'>
            <div className='container user-last-reviews mb-md-3 mt-md-3 mt-1 mb-1'>
                <h3 className='user-last-reviews-title'>{appLanguage === 'eng' ? 'Last reviews' : 'Останні відгуки'}</h3>
                <div className='user-last-reviews-reviews reviews row m-0  pb-1 pt-1 pb-md-4 pt-md-3'>
                    <div className='user-last-reviews-review col-12 col-lg-6 mt-3 mb-3'>
                        <div className='card'>
                            <div className="card-body">
                                <h5 className="card-title"><span className='avatar flex-shrink-0'></span>Alexandr Kovalechenko</h5>
                                <p className="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remain</p>
                            </div>
                            <div className="card-footer pb-1 pt-1 text-muted">
                                2 days ago
                            </div>
                        </div>
                    </div>
                    <div className='user-last-reviews-review  col-12 col-lg-6 mt-3 mb-3'>
                        <div className='card'>
                            <div className="card-body">
                                <h5 className="card-title"><span className='avatar flex-shrink-0'></span>Alexandr Kovalechenko</h5>
                                <p className="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ind has survived not only five centuries, but also the leap into electronic typesetting, remain</p>
                            </div>
                            <div className="card-footer pb-1 pt-1 text-muted">
                                2 days ago
                            </div>
                        </div>
                    </div>
                    <div className='user-last-reviews-review  col-12 col-lg-6 mt-3 mb-3'>
                        <div className='card'>
                            <div className="card-body">
                                <h5 className="card-title"><span className='avatar flex-shrink-0'></span>Alexandr Kovalechenko</h5>
                                <p className="card-text">Lorem Ienturies, but also the leap into electronic typesetting, remain</p>
                            </div>
                            <div className="card-footer pb-1 pt-1 text-muted">
                                2 days ago
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}