import React from 'react';
import '../style/reviews.css';
export default (props) => {
    const reviews = [{ name: 'Bogdan', surname: 'Seredenko', text: 'Some text vlblbl fdg kdpogjj jjjj gk  gfhj ghj hgj ghj ghj ghj gf ghj oddigj jo sl osji kjs', time: '2 day ago' }, { name: 'Ivan', surname: 'Halus', text: 'Some text vlblbl fdg kdpogk oddigj jo sl osji kjs', time: '2 day ago' }, { name: 'Ivan', surname: 'Halus', text: 'Some text vlblbl fdg kdpogk oddigj jo sl osji kjs', time: '2 day ago' }, { name: 'Ivan', surname: 'Halus', text: 'Some text vlblbl fdg kdpogk oddigj jo sl osji kjs', time: '2 day ago' }, { name: 'Ivan', surname: 'Halus', text: 'Some text vlblbl fdg kdpogk oddigj jo sl osji kjs', time: '2 day ago' }, { name: 'Ivan', surname: 'Halus', text: 'Some text vlblbl fdg kdpogk oddigj jo sl osji kjs', time: '2 day ago' }]
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