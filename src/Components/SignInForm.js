import React, { useContext } from 'react';
import AppLanguage from '../Contexts/AppLanguage.js';
export default (props) => {
    const appLanguage = useContext(AppLanguage).appLanguage;
    return (
        <form>
            <div className="input-group">
                <input type="text" className="form-control" placeholder={appLanguage === 'eng'? "Email": 'Емейл' } name='email' />
            </div>
            <div className="input-group">
                <input type="password" className="form-control" name='password' placeholder={appLanguage === 'eng'? "Password": 'Пароль' } />
            </div>
            <div className='d-flex justify-content-end'>
                <button type="submit" className="btn btn-dark ml-auto">{appLanguage === 'eng'? "Submit": 'Відправити' }</button>
            </div>
        </form>
    )
}