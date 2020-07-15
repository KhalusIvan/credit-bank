import React from 'react';
import '../style/reviews.css';
export default (props) => {
    const reviews = [{ name: 'Bogdan', surname: 'Seredenko', text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remain", time: '2 day ago' }, { name: 'Ivan', surname: 'Halus', text: 'Some text vlblbl fdg kdpogk oddigj jo sl osji kjs', time: '2 day ago' }, { name: 'Ivan', surname: 'Halus', text: 'Some text vlblbl fdg kdpogk oddigj jo sl osji kjs', time: '2 day ago' }, { name: 'Ivan', surname: 'Halus', text: 'Some text vlblbl fdg kdpogk oddigj jo sl osji kjs', time: '2 day ago' }, { name: 'Ivan', surname: 'Halus', text: 'Some text vlblbl fdg kdpogk oddigj jo sl osji kjs', time: '2 day ago' }, { name: 'Ivan', surname: 'Halus', text: 'Some text vlblbl fdg kdpogk oddigj jo sl osji kjs', time: '2 day ago' }]
    return reviews.map((review,i) => (
        <div key={i} className='card item'>
            <div className="card-body">
                <h5 className="card-title"><span className='avatar flex-shrink-0'></span>{review.name} {review.surname}</h5>
                <p className="card-text">{review.text}</p>
            </div>
            <div className="card-footer pb-1 pt-1 text-muted">
                {review.time}
            </div>
        </div>
    ))
}