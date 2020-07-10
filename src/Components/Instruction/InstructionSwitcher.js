import React, { useContext, useState } from 'react';
import '../../style/instructionSwitcher.css';
export default (props)=>{
    const toggleActive = props.toggleFunction;
    return (
        <div className={`Switcher-variants ${props.active} ${props.classSwitcher}`}>
            <span className={`first-variant variant flex-shrink-0 ${props.active==='left'?'active':''}`} onClick={toggleActive}>
                {props.firstVariant}
            </span>
            <span className={`second-variant variant flex-shrink-0 ${props.active==='right'?'active':''}`} onClick={toggleActive}>
                {props.secondVariant}
            </span>
        </div>
    )
}