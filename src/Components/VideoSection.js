import React from 'react';
import video from '../Image/video.mp4';
import ScrollMePlugin from './ScrollMePlugin.js'
export default (props) => {
    return (
        <div className="container-fluid video-container p-0">
            <div className="overlay"></div>
            <ScrollMePlugin  data-when="span" data-from="0" data-to="1" data-easing="linear" data-translatey="400">
            <video playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop">
                <source src={video} type="video/mp4" />
            </video>
            </ScrollMePlugin>
            {props.children}
        </div>
    )
}