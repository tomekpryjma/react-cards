import React from 'react';

function Card(props) {
    return(
        <div className="card">
            <div className="front" style={{backgroundImage: `url(${props.card_image_url})`}}></div>
            <div className="back" style={{backgroundImage: `url(${props.card_background_url})`}}></div>
        </div>
    );
}

export default Card;