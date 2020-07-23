import React, { useContext, useEffect, useRef, useState } from 'react';
import AppLanguage from '../../../Contexts/AppLanguage';
import Zoom from 'react-reveal/Zoom';
export default (props) => {
    const { appLanguage } = useContext(AppLanguage);
    const name = props.name;
    const text = props.text;
    const date = props.date;
    const id = props.id;
    const modal = props.idOfModal;
    const [startAnimation, setStartAnimation] = useState(false);
    const elements = useRef(null);
    function isStartAnimation() {
        if (elements.current.getBoundingClientRect().top < document.documentElement.clientHeight)
            setStartAnimation(true);
    }
    useEffect(() => {
        if (!startAnimation) {
            window.addEventListener('scroll', isStartAnimation);
            window.addEventListener('load', isStartAnimation);
            isStartAnimation();
            return () => {
                window.removeEventListener('scroll', isStartAnimation);
                window.removeEventListener('load', isStartAnimation);
            }
        }
    }, [startAnimation]);
    return (
        <div ref={elements} className='user-last-reviews-review col-12 col-lg-6 mt-3 mb-3'>
            <Zoom when={startAnimation}>
                <div className='card'>
                    <div className="card-body">
                        <h5 className="card-title"><span style={{backgroundImage:props.avatar?props.avatar:''}} className='avatar flex-shrink-0'></span>{name}</h5>
                        <p className="card-text">{text}</p>
                    </div>
                    <div className="card-footer pb-1 pt-1 text-muted d-flex align-items-center justify-content-between">
                        {date}
                        <div className='btns d-flex '>
                            <button className='btn btn-primary' data-toggle='modal' data-target={'#'+modal}  onClick={() => { props.editReview(id) }}>{appLanguage === 'eng' ? 'Edit' : 'Змінити'}</button>
                            <button className='btn btn-danger' onClick={() => { props.deleteReview(id) }}>{appLanguage === 'eng' ? 'Delete' : 'Видалити'}</button>
                        </div>
                    </div>
                </div>
            </Zoom>
        </div>
    )
}