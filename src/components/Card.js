import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

function Card(props) {
    const [flipped, setFlipped] = useState(false);
    const [timeline] = useState(gsap.timeline({paused: true}));
    const frontElement = useRef(null);
    const backElement = useRef(null);

    useEffect(() => {
        timeline
            .set(frontElement.current, {rotationY: -180})
            .to(backElement.current, {rotationY: 180})
            .to(frontElement.current, {rotationY: 0})
            .reverse()
    }, []);

    const onClick = () => {
        timeline.reversed(! timeline.reversed());
    }

    return(
        <div className="card" onClick={onClick}>
            <div
                className="front"
                style={{backgroundImage: `url(${props.card_image_url})`}}
                ref={frontElement}
            ></div>
            <div
                className="back"
                style={{backgroundImage: `url(${props.card_background_url})`}}
                ref={backElement}
            ></div>
        </div>
    );
}

export default Card;