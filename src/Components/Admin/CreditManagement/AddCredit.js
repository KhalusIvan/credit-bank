import React, { useEffect, useContext, useState } from 'react';
import AppLanguage from '../../../Contexts/AppLanguage.js';
import { useAlert } from 'react-alert';
import '../../../style/adminAddCredit.css';
export default (props) => {
    const maxValueForNumberInput = 9;
    const maxValueForDescriptionInput = 200;
    const { appLanguage } = useContext(AppLanguage);
    const alert = useAlert();
    const [isSending, setIsSending] = useState(false);
    const [nameValue, setNameValue] = useState(props.nameValue ? inputText(props.nameValue, 25, 3) ? props.nameValue : '' : '');
    const [minValue, setMinValue] = useState(props.minValue ? inputOnlyNumbers(props.minValue, maxValueForNumberInput) ? props.minValue : '' : '');
    const [maxValue, setMaxValue] = useState(props.maxValue ? inputOnlyNumbers(props.maxValue, maxValueForNumberInput) ? props.maxValue : '' : '');
    const [minTerm, setMinTerm] = useState(props.minTerm ? inputOnlyNumbers(props.minTerm, maxValueForNumberInput) ? props.minTerm : '' : '');
    const [maxTerm, setMaxTerm] = useState(props.maxTerm ? inputOnlyNumbers(props.maxTerm, maxValueForNumberInput) ? props.maxTerm : '' : '');
    const [percent, setPercent] = useState(props.percent ? inputOnlyFloatNumbers(props.percent, 3) ? props.percent : '' : '');
    const [description, setDescription] = useState(props.description ? inputAnything(props.description, maxValueForDescriptionInput) ? props.description : '' : '');
    useEffect(() => {
        setNameValue(props.nameValue ? inputText(props.nameValue, 25, 3) ? props.nameValue : '' : '');
        setMinValue(props.minValue ? inputOnlyNumbers(props.minValue, maxValueForNumberInput) ? props.minValue : '' : '');
        setMaxValue(props.maxValue ? inputOnlyNumbers(props.maxValue, maxValueForNumberInput) ? props.maxValue : '' : '');
        setMinTerm(props.minTerm ? inputOnlyNumbers(props.minTerm, maxValueForNumberInput) ? props.minTerm : '' : '');
        setMaxTerm(props.maxTerm ? inputOnlyNumbers(props.maxTerm, maxValueForNumberInput) ? props.maxTerm : '' : '');
        setPercent(props.percent ? inputOnlyFloatNumbers(props.percent, 3) ? props.percent : '' : '');
        setDescription(props.description ? inputAnything(props.description, maxValueForDescriptionInput) ? props.description : '' : '');
    }, [props.id]);
    function inputOnlyNumbers(text, maxLength) {
        return new RegExp(`(^[1-9]\\d{0,${maxLength - 1}}$)|(^$)`).test(text);
    }
    function inputOnlyFloatNumbers(text, maxLength) {
        return new RegExp(`(^[1-9]\\d{0,${maxLength - 1}}(\\.[1-9]?\\d{0,2})?$)|(^$)`).test(text);
    }
    function inputText(text, maxLength, maxWords) {
        return text.length >= maxLength ? false : new RegExp(`^((\\w|[??-????-??\-])*\\s?){1,${maxWords === Infinity ? '' : maxWords}}$`, 'gm').test(text);
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
        if (inputOnlyFloatNumbers(e.target.value, 3)) {
            setPercent(e.target.value)
        }
    }
    function inputNameValue(e) {
        if (inputText(e.target.value, 25, 3)) {
            setNameValue(e.target.value)
        }
    }
    function inputDescription(e) {
        if (inputAnything(e.target.value, maxValueForDescriptionInput)) {
            setDescription(e.target.value)
        }
    }
    function checkForm() {
        if (nameValue.length === 0 || /^\s*$/g.test(nameValue)) {
            alert.error(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Error' : '??????????????'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'The name of credit shouldnot be empty' : "????'?? ???? ?????? ???????? ????????????"}</p></div>);
            return false;
        }
        if (minValue.length === 0) {
            alert.error(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Error' : '??????????????'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'The min value of credit should not be empty' : "???????????????????? ???????? ?????????????? ???? ?????? ???????? ????????????"}</p></div>);
            return false;
        }
        if (maxValue.length === 0) {
            alert.error(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Error' : '??????????????'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'The max value of credit should not be empty' : "?????????????????????? ???????? ?????????????? ???? ?????? ???????? ????????????"}</p></div>);
            return false;
        }
        if (+maxValue <= +minValue) {
            alert.error(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Error' : '??????????????'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'The max value of credit should be bigger than min value' : "?????????????????????? ???????? ?????? ???????? ??????????????, ?????? ????????????????????"}</p></div>);
            return false;
        }
        if (minTerm.length === 0) {
            alert.error(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Error' : '??????????????'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'The min term of credit should not be empty' : "?????????????????????? ???????????? ?????????????? ???? ?????? ???????? ????????????"}</p></div>);
            return false;
        }
        if (maxTerm.length === 0) {
            alert.error(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Error' : '??????????????'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'The max term of credit should not be empty' : "???????????????????????? ???????????? ?????????????? ???? ?????? ???????? ????????????"}</p></div>);
            return false;
        }
        if (+maxTerm <= +minTerm) {
            alert.error(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Error' : '??????????????'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'The max term of credit should be bigger than min term' : "???????????????????????? ???????????? ?????????????? ?????? ???????? ??????????????, ?????? ??????????????????????"}</p></div>);
            return false;
        }
        if (description.length === 0 || /^\s*$/g.test(description)) {
            alert.error(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Error' : '??????????????'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'The description of credit shouldnot be empty' : "???????? ???? ?????? ???????? ????????????"}</p></div>);
            return false;
        }
        if (percent.length === 0) {
            alert.error(<div><div className='alert-title'>{appLanguage === 'eng' ? 'Error' : '??????????????'}</div><p className='alert-text text-nowrap'>{appLanguage === 'eng' ? 'The percent of credit should not be empty' : "???????????????? ?????????????? ???? ?????? ???????? ????????????"}</p></div>);
            return false;
        }
        return true
    }
    async function submitForm(e) {
        e.preventDefault();
        if (!checkForm()) return;
        setIsSending(true);
        let parsedPercent = percent;
        if (percent[percent.length - 1] === '.')
            parsedPercent = percent.substring(0, percent.length - 1);
        let resp = await props.onSubmitFunction({
            name: nameValue,
            min_value: +minValue,
            max_value: +maxValue,
            min_term: +minTerm,
            max_term: +maxTerm,
            description: description,
            percent: +parsedPercent,
            id: props.id
        });
        if (resp) {
            setNameValue('');
            setMinValue('');
            setMaxValue('');
            setMinTerm('');
            setMaxTerm('');
            setPercent('');
            setDescription('');
            setIsSending(false);
        }
    }
    return (
        <div className='container-fluid p-0 admin-add-credit-wrapper'>
            <div className='container admin-add-credit'>
                <form onSubmit={submitForm}>
                    <div className="form-row">
                        <div className="form-group col-12">
                            <label className='m-0' htmlFor="creditName">{appLanguage === 'eng' ? 'Name' : '??????????'}</label>
                            <input value={nameValue} onChange={inputNameValue} type="text" className="form-control" id="creditName" />
                        </div>
                        <div className="form-group col-sm-6">
                            <label className='m-0' htmlFor="creditMinValue">{appLanguage === 'eng' ? 'Min value' : '?????? ????????????????'}</label>
                            <input value={minValue} onChange={inputMinValue} type="text" className="form-control" id="creditMinValue" />
                        </div>
                        <div className="form-group col-sm-6">
                            <label className='m-0' htmlFor="creditMaxValue">{appLanguage === 'eng' ? 'Max value' : '???????? ????????????????'}</label>
                            <input value={maxValue} onChange={inputMaxValue} type="text" className="form-control" id="creditMaxValue" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-sm-6">
                            <label className='m-0' htmlFor="creditMinTerm">{appLanguage === 'eng' ? 'Min term' : '?????????????????????? ????????????'}</label>
                            <input value={minTerm} onChange={inputMinTerm} type="text" className="form-control" id="creditMinTerm" />
                        </div>
                        <div className="form-group col-sm-6">
                            <label className='m-0' htmlFor="creditMaxTerm">{appLanguage === 'eng' ? 'Max term' : '???????????????????????? ????????????'}</label>
                            <input value={maxTerm} onChange={inputMaxTerm} type="text" className="form-control" id="creditMaxTerm" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-12">
                            <label className='m-0' htmlFor="creditDescription">{appLanguage === 'eng' ? 'Description' : '????????'}</label>
                            <textarea value={description} onChange={inputDescription} type="text" className="form-control" id="creditDescription" maxLength='200' />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-sm-6">
                            <label className='m-0' htmlFor="creditPercent">{appLanguage === 'eng' ? 'Percent' : '????????????????'}</label>
                            <input value={percent} onChange={inputPercent} type="text" className="form-control" id="creditPercent" />
                        </div>
                        <div className='submit-button form-group col-sm-6'>
                            <button disabled={isSending} type="submit" className="btn btn-primary">
                                {isSending ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : appLanguage === 'eng' ? 'Send' : '????????????????????'}
                            </button>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}
