import React from 'react';
import CarouselIndicators from './CarouselIndicators.js';
import CarouselInner from './CarouselInner.js';
export default (props) => {
    const carouselId = props.id;
    const isIndecators = props.isIndecators;
    const carouselItems = props.carouselItems;
    return (
        <div id={carouselId} className="carousel slide" data-ride="carousel">
            {isIndecators?<CarouselIndicators id={carouselId} numberOfIndicators={carouselItems.length}/>:null}
            <CarouselInner carouselItems={carouselItems}/>
            <a className="carousel-control-prev" href={`#${carouselId}`} role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href={`#${carouselId}`} role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    );
}