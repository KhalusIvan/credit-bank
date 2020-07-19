import React from 'react';
export default (props) => {
    return (
        <div className="card">
            <div className="card-body text-left">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text text-muted">{props.text}</p>
            </div>
        </div>
    )
}