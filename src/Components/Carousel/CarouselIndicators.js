import React from 'react';
export default (props) => {
    const numberOfIndicators = props.numberOfIndicators;
    const carouselId = props.id;
    function createIndicators(numberOfIndicators,carouselId){
        let arr = [];
        for (let i = 0; i < numberOfIndicators; i++) {
            arr.push(<li key={i} data-target={`#${carouselId}`} data-slide-to={i} className={i===0?'active':''}></li>);
        }
        return arr;
    }
    return (
        <ol className="carousel-indicators">
            {createIndicators(numberOfIndicators,carouselId)}
        </ol>
    );
}