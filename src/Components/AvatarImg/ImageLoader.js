import React from 'react';
const ImageLoader = (props) => {
    function handleImage(event){
        props.handleImage(event);
    }
    return (
        <input onChange={handleImage} type="file" name="picture" className="fileLoader" accept="image/*"></input>
    )
}
export default ImageLoader;