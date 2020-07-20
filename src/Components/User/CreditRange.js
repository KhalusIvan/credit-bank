import React, { useContext, useState, useEffect } from 'react';
import User from '../../Contexts/User.js';
import AppLanguage from '../../Contexts/AppLanguage.js';
import InputRange from '../InputRange';
import '../../style/credit-range.css';
export default (props) => {
    const { user } = useContext(User);
    const { appLanguage } = useContext(AppLanguage);
    const [value,setValue] = useState(String(props.min + props.subcontrollerText));
    const [focus,setFocus] = useState(false);
    function inputOnlyNumbers(text) {
        return /^\d*$/.test(text);
    }
    function inputValue(e) {
        inputOnlyNumbers(e.target.value)
        if(inputOnlyNumbers(e.target.value)){
            setValue(e.target.value)
        }
    }
    function verificDiapazonOfValue(value) {
        if (value > props.max)
            return props.max;
        else if (value < props.min)
            return props.min;
        return value;
    }
    function changeRange(value) {
        setValue(String(value) + props.subcontrollerText)
    }
    function focusTrue() {
        setValue(value.replace(props.subcontrollerText,''));
    }
    function focusFalse() {
        const newValue = String(verificDiapazonOfValue(+value));
        setValue(newValue.replace(/^0+?([1-9])/,newValue.match(/^0+?([1-9])/)?newValue.match(/^0+?([1-9])/)[1]:'') + props.subcontrollerText)
    }
    return (
        <div className='credit-range'>
            <div className='preview-value'>
                <div className='text'>{props.text}</div>
                <div className='input-field'><input value={value} onFocus={focusTrue} onBlur={focusFalse} onChange={inputValue} type="text" className="form-control"/></div>
            </div>
            <InputRange subcontrollerText={props.subcontrollerText} changeRange={changeRange} initialValue={value} min={props.min} max={props.max} step={props.step} />
        </div>
    )
}