import React, { useContext, useState, useRef } from 'react';
import AppLanguage from '../../Contexts/AppLanguage';
import Logo from '../Logo.js';
import Avatar from './Avatar.js';

export default (props) => {
    const { appLanguage } = useContext(AppLanguage);
    const closeModalButton = useRef(null);
    const previewAvatarElement = useRef(null);
    const [isPicture, setIsPicture] = useState(false);
    const [isSending, setIsSending] = useState(false);
    async function sendAvatar() {
        setIsSending(true);
        let imageBlob = await new Promise(resolve => previewAvatarElement.current.toBlob(resolve, 'image/jpeg'));
        let comprimed;
        console.log(imageBlob);
        if(imageBlob.size > 500000){
            comprimed = await new Promise(resolve => previewAvatarElement.current.toBlob(resolve, 'image/jpeg',0.2));
        }else if(imageBlob.size > 100000 && imageBlob.size <= 500000){
            comprimed = await new Promise(resolve => previewAvatarElement.current.toBlob(resolve, 'image/jpeg',0.4));
        }else if(imageBlob.size > 50000 && imageBlob.size <= 100000){
            comprimed = await new Promise(resolve => previewAvatarElement.current.toBlob(resolve, 'image/jpeg',0.6));
        }else if(imageBlob.size > 10000 && imageBlob.size <= 50000){
            comprimed = await new Promise(resolve => previewAvatarElement.current.toBlob(resolve, 'image/jpeg',0.8));
        }else{
            comprimed = imageBlob;
        }
        setTimeout(() => {
            console.log(comprimed);
        }, 100);
        let formData =  new FormData();
        formData.append("name", "John");
        formData.append("file", await comprimed, "image.png");
        let response = await fetch('https://testservere.herokuapp.com/sendFile', {
            method: 'POST',
            body: formData
        });
        let result = await response.json();
        if(await result.status === 'ok'){
            closeModalButton.current.click();
            document.location.reload();
        }
        else console.log('Something was wrong'); 
    }
    return (
        <div className="modal fade signForm change-avatar p-0 " id="changeAvatar" tabIndex="-1" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <Logo />
                        <button ref={closeModalButton} type="button" className="close p-0 mt-1" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className='modal-body'>
                        <Avatar isSending={isSending} previewAvatarElement={previewAvatarElement} setIsPicture={setIsPicture} />
                    </div>
                    <div className='modal-footer'>
                        <button disabled={!isPicture || isSending} onClick={sendAvatar} className='btn btn-dark'>
                            {isSending?<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>:'Send'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}