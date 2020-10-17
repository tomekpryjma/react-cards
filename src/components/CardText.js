import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

function CardText(props) {
    const [fadeTimeline] = useState(gsap.timeline({paused: true}));
    const [expandTimeline] = useState(gsap.timeline({paused: true}));
    const wrapperElement = useRef(null);
    const textWrapper = useRef(null);

    useEffect(() => {
        fadeTimeline.fromTo(wrapperElement.current, {opacity: 0}, {opacity: 1});
        expandTimeline.fromTo(textWrapper.current, {height: 0}, {height: textWrapper.current.clientHeight}).reverse()
    }, [])

    useEffect(() => {
        console.log(props.flipped)
        if (props.flipped) {
            fadeTimeline.play();
        }
        else {
            fadeTimeline.reverse();
        }
    }, [props.flipped])

    const handleOnClick = () => {
        expandTimeline.reversed(! expandTimeline.reversed())
    }

    return(
        <div className="read-more-wrapper" ref={wrapperElement}>
            <button className="read-more-trigger" onClick={handleOnClick}>Read more</button>
            <div className="card-description" ref={textWrapper}>
                {props.card_text}
            </div>
        </div>
    );
}

export default CardText;