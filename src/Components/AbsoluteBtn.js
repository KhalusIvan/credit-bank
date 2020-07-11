import React from 'react';
import '../style/absollute-btn.css';
export default (props) => {
    return (
        <button className={`btn${props.btnClass} absolute-btn`} data-target={props.dataTarget} data-toggle={props.dataToggle}>{props.btnText}</button>
    )
}