import scrollme from '../script/jquery.scrollme.js';
import React, { useEffect } from 'react';
import $ from "jquery";
const ScrollMePlugin = (props) => {
    useEffect(()=>{
        $('.carousel-header .carousel').on('slide.bs.carousel', function () {
            setTimeout(() => {
                scrollme.init();
            }, 0);   
        });
        scrollme.init();
    },[]);
    return (
        <div className='scrollme'>
            <div className='animateme' {...props}>
                {props.children}
            </div>
        </div>
    )
}
export default ScrollMePlugin;