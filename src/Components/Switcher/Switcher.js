import React from 'react';
import '../../style/switcher.css';
export default (props) => {
    return (
        <div className='d-inline-block'>
            <label className="switch mb-0">
                <input type="checkbox" ref={props.refElement} onClick={(e)=>{e.preventDefault(); e.stopPropagation()}}/>
                <span className="slider round"></span>
            </label>
        </div>
    )
}