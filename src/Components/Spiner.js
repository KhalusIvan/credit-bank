import React from 'react';
import '../style/Spiner.css';
export default (props) => {
    return (
        <div className="d-flex Spiner justify-content-center align-items-center">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}