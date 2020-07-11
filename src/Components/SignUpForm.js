import React, { useState, useContext } from 'react';
import AppLanguage from '../Contexts/AppLanguage.js';
export default (props) => {
    const appLanguage = useContext(AppLanguage).appLanguage;
    return (
        <form>
            <div className="input-group">
                <input type="text" className="form-control" name='first-name' placeholder='First name' />
            </div>
            <div className="input-group">
                <input type="text" className="form-control" name='second-name' placeholder='Second name' />
            </div>
            <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                    <div className="input-group-text">@</div>
                </div>
                <input type="text" className="form-control" placeholder="Email" name='email' />
            </div>
            <div className="input-group">
                <input type="password" className="form-control" name='password' placeholder='Password' />
            </div>
            <div className='d-flex justify-content-end'>
                <button type="submit" className="btn btn-dark ml-auto">Submit</button>
            </div>
        </form>
    )
}