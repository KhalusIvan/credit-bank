import React from 'react';
import ScrollMePlugin from '../ScrollMePlugin.js';
export default (props) => {
    const caption = props.caption;
    return (
        <div className="carousel-caption d-block">
            <ScrollMePlugin data-when='span' data-from="0" data-to="1" data-easing="linear" data-translatey="150">
                <div className='carousel-caption-content  p-2'>
                    {caption.slogan ? <p className="slogan mb-0">{caption.slogan}</p> : ''}
                    {caption.h1 ? <h1>{caption.h1}</h1> : ''}
                    {caption.small ? <small className='d-block'>{caption.small}</small> : ''}
                    {caption.button ? caption.button : ''}
                </div>
            </ScrollMePlugin>
        </div>
    )
}