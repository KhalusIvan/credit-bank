import React, { useContext, useState, useRef} from 'react';
import AppLanguage from '../Contexts/AppLanguage';
export default (props) => {
    const { appLanguage } = useContext(AppLanguage);
    const firstName = useRef(null);
    const secondName = useRef(null);
    const [isValidForm, setIsValidForm] = useState(false);
    function validateName(e) {
        let regex = /^[A-Z][a-z']+?([-`']{1}[A-Z]{1}[a-z']+?)?$|^[А-ЯІЇ][а-яії']+?([-`']{1}[А-ЯІЇ]{1}[а-яії']+?)?$/u;
        if(e.target.value.length !== 0){
            if(regex.test(e.target.value) && e.target.value.length <= 20){
                e.target.classList.add('valid');
                e.target.classList.remove('invalid');
            }
            else{
                e.target.classList.add('invalid');
                e.target.classList.remove('valid');
            }
        }
    }
    function returnStateOfField(e) {
        if(e.target.value.length === 0){
            e.target.classList.remove('valid');
            e.target.classList.remove('invalid');
        }
    }
    function checkAllField(){
        const isValidForm = firstName.current.classList.contains('valid') && secondName.current.classList.contains('valid');
        setIsValidForm(isValidForm);
    }
    function checkForm(e) {
        returnStateOfField(e);
        checkAllField();
    }
    return (
        <div className='changeUserData'>
            <h3 className='h3 text-dark text-center mb-0 mb-sm-3 change-data-title'>{appLanguage === 'eng' ? 'Change name' : "Змінити ім'я"}</h3>
            <form>
                <div className="form-group row mb-1 mb-sm-3">
                    <label htmlFor="changeUserFirstName" className='text-nowrap col-sm-3 col-form-label text-left text-sm-right'>{appLanguage === 'eng' ? 'First name' : "Ім'я"}</label>
                    <div className='col-sm-6 col-md-9 d-flex align-items-center'>
                        <input ref={firstName} autoComplete='off' type="text" className="form-control" id='changeUserFirstName' onChange={(e)=>{validateName(e);checkForm(e)}} />
                    </div>
                </div>
                <div className="form-group row mb-1 mb-sm-3">
                    <label htmlFor="changeUserSecondName" className='text-nowrap col-sm-3 col-form-label pb-1 pb-sm-2 text-left text-sm-right'>{appLanguage === 'eng' ? 'Second name' : "Прізвище"}</label>
                    <div className='col-sm-6 col-md-9 d-flex align-items-center'>
                        <input ref={secondName} autoComplete='off' type="text" className="form-control" id='changeUserSecondName' onChange={(e)=>{validateName(e);checkForm(e)}} />
                    </div>
                </div>
                <div className='d-flex justify-content-end  justify-content-sm-center justify-content-md-end'>
                    <button type="submit" disabled={!isValidForm} className="btn btn-secondary">{appLanguage === 'eng' ? 'Submit' : "Відправити"}</button>
                </div>
            </form>
        </div>
    )
}