import React, { useEffect, useContext, useState, useRef } from 'react';
import Proxy from '../../../Contexts/Proxy.js';
import AppLanguage from '../../../Contexts/AppLanguage.js';
import { useAlert } from 'react-alert';
import '../../../style/adminAddCredit.css';
export default (props) => {
    const maxValueForNumberInput = 9;
    const { appLanguage } = useContext(AppLanguage);
    const { proxy } = useContext(Proxy);
    const alert = useAlert();


    const [nameValue, setNameValue] = useState('');
    const [minValue, setMinValue] = useState('');
    const [maxValue, setMaxValue] = useState('');
    const [minTerm, setMinTerm] = useState('');
    const [maxTerm, setMaxTerm] = useState('');
    const [percent, setPercent] = useState('');
    const [description, setDescription] = useState('');
    function inputOnlyNumbers(text, maxLength) {
        return new RegExp(`(^[1-9]\\d{0,${maxLength - 1}}$)|(^$)`).test(text);
    }
    function inputText(text, maxLength, maxWords) {
        return text.length >= maxLength ? false : new RegExp(`^((\\w|[а-яА-я\-])*\\s?){1,${maxWords === Infinity ? '' : maxWords}}$`, 'gm').test(text);
    }
    function inputAnything(text, maxLength) {
        return text.length <= maxLength;
    }
    function inputMinValue(e) {
        if (inputOnlyNumbers(e.target.value, maxValueForNumberInput)) {
            setMinValue(e.target.value)
        }
    }
    function inputMaxValue(e) {
        if (inputOnlyNumbers(e.target.value, maxValueForNumberInput)) {
            setMaxValue(e.target.value)
        }
    }
    function inputMinTerm(e) {
        if (inputOnlyNumbers(e.target.value, maxValueForNumberInput)) {
            setMinTerm(e.target.value)
        }
    }
    function inputMaxTerm(e) {
        if (inputOnlyNumbers(e.target.value, maxValueForNumberInput)) {
            setMaxTerm(e.target.value)
        }
    }
    function inputPercent(e) {
        if (inputOnlyNumbers(e.target.value, 3)) {
            setPercent(e.target.value)
        }
    }
    function inputNameValue(e) {
        if (inputText(e.target.value, 25, 3)) {
            setNameValue(e.target.value)
        }
    }
    function inputDescription(e) {
        if (inputAnything(e.target.value, 200)) {
            setDescription(e.target.value)
        }
    }
    function checkForm() {
        if (nameValue.length === 0 || /^\s*$/g.test(nameValue)) {
            alert.error(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Error' : 'Помилка'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'The name of credit shouldnot be empty' : "Ім'я не має бути пустим"}</p></div>);
            return false;
        }
        if(minValue.length === 0){
            alert.error(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Error' : 'Помилка'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'The min value of credit should not be empty' : "Мінімальна сума кредиту не має бути пустою"}</p></div>);
            return false;
        }
        if(maxValue.length === 0){
            alert.error(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Error' : 'Помилка'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'The max value of credit should not be empty' : "Максимальна сума кредиту не має бути пустою"}</p></div>);
            return false;
        }
        if(maxValue <= minValue){
            alert.error(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Error' : 'Помилка'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'The max value of credit should be bigger than min value' : "Максимальна сума має бути більшою, ніж мінімальна"}</p></div>);
            return false;
        }
        if(minTerm.length === 0){
            alert.error(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Error' : 'Помилка'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'The min term of credit should not be empty' : "Мінімальний термін кредиту не має бути пустим"}</p></div>);
            return false;
        }
        if(maxTerm.length === 0){
            alert.error(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Error' : 'Помилка'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'The max term of credit should not be empty' : "Максимальний термін кредиту не має бути пустим"}</p></div>);
            return false;
        } 
        if(maxTerm <= minTerm){
            alert.error(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Error' : 'Помилка'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'The max term of credit should be bigger than min term' : "Максимальний термін кредиту має бути більшим, ніж мінімальний"}</p></div>);
            return false;
        }
        if (description.length === 0 || /^\s*$/g.test(description)) {
            alert.error(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Error' : 'Помилка'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'The description of credit shouldnot be empty' : "Опис не має бути пустим"}</p></div>);
            return false;
        }
        if(percent.length === 0){
            alert.error(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Error' : 'Помилка'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'The percent of credit should not be empty' : "Відсоток кредиту не має бути пустим"}</p></div>);
            return false;
        }
        return true
    }
    function submitForm(e) {
        e.preventDefault();
        console.log(checkForm());
    }
    return (
        <div className='container-fluid p-0 admin-add-credit-wrapper'>
            <div className='container admin-add-credit'>
                <form onSubmit={submitForm}>
                    <div className="form-row">
                        <div className="form-group col-12">
                            <label className='m-0' htmlFor="creditName">{appLanguage === 'eng' ? 'Name' : 'Назва'}</label>
                            <input value={nameValue} onChange={inputNameValue} type="text" className="form-control" id="creditName" />
                        </div>
                        <div className="form-group col-sm-6">
                            <label className='m-0' htmlFor="creditMinValue">{appLanguage === 'eng' ? 'Min value' : 'Мін значення'}</label>
                            <input value={minValue} onChange={inputMinValue} type="text" className="form-control" id="creditMinValue" />
                        </div>
                        <div className="form-group col-sm-6">
                            <label className='m-0' htmlFor="creditMaxValue">{appLanguage === 'eng' ? 'Max value' : 'Макс значення'}</label>
                            <input value={maxValue} onChange={inputMaxValue} type="text" className="form-control" id="creditMaxValue" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-sm-6">
                            <label className='m-0' htmlFor="creditMinTerm">{appLanguage === 'eng' ? 'Min term' : 'Мінімальний термін'}</label>
                            <input value={minTerm} onChange={inputMinTerm} type="text" className="form-control" id="creditMinTerm" />
                        </div>
                        <div className="form-group col-sm-6">
                            <label className='m-0' htmlFor="creditMaxTerm">{appLanguage === 'eng' ? 'Max term' : 'Максимальний термін'}</label>
                            <input value={maxTerm} onChange={inputMaxTerm} type="text" className="form-control" id="creditMaxTerm" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-12">
                            <label className='m-0' htmlFor="creditDescription">{appLanguage === 'eng' ? 'Description' : 'Опис'}</label>
                            <textarea value={description} onChange={inputDescription} type="text" className="form-control" id="creditDescription" maxLength='200' />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-sm-6">
                            <label className='m-0' htmlFor="creditPercent">{appLanguage === 'eng' ? 'Percent' : 'Відсоток'}</label>
                            <input value={percent} onChange={inputPercent} type="text" className="form-control" id="creditPercent" />
                        </div>
                        <div className='submit-button form-group col-sm-6'>
                            <button type="submit" className="btn btn-primary">{appLanguage === 'eng' ? 'Send' : 'Відправити'}</button>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}
