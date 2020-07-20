import React, { useContext, useState, useEffect } from 'react';
import '../style/inputRange.css';
export default (props) => {
    const [value, setValue] = useState(parseInt(props.initialValue));
    function handleValue(e) {
        setValue(e.target.value);
        props.changeRange(parseInt(e.target.value));
    }
    function verificDiapazonOfValue(value) {
        if (value > props.max)
            return props.max;
        else if (value < props.min)
            return props.min;
        return value;
    }
    function incRange() {
        let newValue = verificDiapazonOfValue(+value + props.max * 0.1);
        setValue(String(newValue));
        props.changeRange(parseInt(newValue));
    }
    function decRange() {
        let newValue = verificDiapazonOfValue(+value - props.max * 0.1);
        setValue(String(newValue));
        props.changeRange(parseInt(newValue));
    }
    useEffect(()=>{
        setValue(parseInt(props.initialValue));
    },[parseInt(props.initialValue)])
    return (
        <div className='range'>
            <div onClick={decRange} className='range-dec range-controller'>
                <div className='range-subcontroller-text text-nowrap text-muted'>{props.min} {props.subcontrollerText}</div>
            </div>
            <input ref={props.rangeRef} value={value} onChange={handleValue} type="range" min={props.min} max={props.max} step={props.step} />
            <div onClick={incRange} className='range-inc range-controller'>
            <div className='range-subcontroller-text text-nowrap text-muted'>{props.max} {props.subcontrollerText}</div>
            </div>
        </div>
    )
}