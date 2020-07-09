import scrollme from '../script/jquery.scrollme.js';
import React, { useEffect } from 'react';
import {throttle} from '../script/custom.js';
import $ from "jquery";
scrollme.init = throttle(scrollme.init,2000);
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