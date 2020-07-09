import React from 'react';
import ScrollMePlugin from '../ScrollMePlugin';
import CarouselCaption from './CarouselCaption.js';
export default (props) => {
    const carouselItems = props.carouselItems;
    return (
        <div className="carousel-inner">
            {carouselItems.map((item,index)=>(
                <div key={item.img} className={`carousel-item ${index === 0 ? 'active':''}`}>
                    <ScrollMePlugin data-when='exit' data-from="0" data-to="1" data-easing="linear" data-translatey="500">
                        <img className='d-block w-100' src={item.img} alt='carouselImage'/>
                    </ScrollMePlugin>
                    {item.caption?<CarouselCaption caption={item.caption}/>:''}
                </div>
            ))}
        </div>
    );
}