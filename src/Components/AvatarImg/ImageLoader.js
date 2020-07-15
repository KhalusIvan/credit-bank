import React, { useContext } from 'react';
import AppLanguage from '../../Contexts/AppLanguage';
const ImageLoader = (props) => {
    function handleImage(event){
        props.handleImage(event);
    }
    const {appLanguage} = useContext(AppLanguage);
    return (
        <div className="custom-file">
            <input disabled={props.isSending} style={{cursor:'pointer'}} onChange={handleImage} type="file" name="picture" className="fileLoader custom-file-input" id="customFileLang" accept="image/*"></input>
            <label className="custom-file-label" htmlFor="customFileLang" data-browse={appLanguage === 'eng' ? 'Browse' : 'Файл'}>{appLanguage === 'eng' ? 'Select the file' : 'Виберіть файл'}</label>
        </div>
       
    )
}
export default ImageLoader;