import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { TweenMax } from 'gsap/gsap-core';

function Card(props) {
    const [flipped, setFlipped] = useState(false);
    const [timeline] = useState(gsap.timeline({paused: true}));
    const [fadeTimeline] = useState(gsap.timeline({paused: true}));
    const [expandTimeline] = useState(gsap.timeline({paused: true}));
    const [readMoreIsExpanded, setReadMoreIsExpanded] = useState(false);
    const cardElement = useRef(null);
    const wrapperElement = useRef(null);
    const textWrapper = useRef(null);
    const frontElement = useRef(null);
    const backElement = useRef(null);
    const textElement = useRef(null);

    useEffect(() => {
        timeline.clear().to(cardElement.current, {rotationY: -180}).reverse()

        fadeTimeline.clear().fromTo(
            wrapperElement.current,
            {opacity: 0},
            {opacity: 1}
        );
        TweenMax.set(textWrapper.current, {height: 0});
    }, []);

    useEffect(() => {
        TweenMax.set(textWrapper.current, {height: 0});
        expandTimeline
            .clear()
            .to(
                textWrapper.current,
                {
                    height: textElement.current.clientHeight,
                    ease: 'expo.inOut'
                }
            ).reverse();
    }, [props.card_text])

    useEffect(() => {
        const expandReverseDelay = props.time_delay;
        const flipReverseDelay = props.time_delay - 0.05;

        if (readMoreIsExpanded == false && flipped == false) {
            return;
        }

        if (props.reset) {
            TweenMax.delayedCall(expandReverseDelay, () => {
                expandTimeline.reverse()
            })
            TweenMax.delayedCall(flipReverseDelay, () => {
                flipToOriginalPosition();
                setFlipped(false);
            })
        }
    }, [props.reset])

    useEffect(() => {
        if (flipped) {
            fadeTimeline.play();
        }
        else {
            fadeTimeline.reverse();
            setReadMoreIsExpanded(false)
        }
    }, [flipped])

    const flipToOriginalPosition = () => {
        TweenMax.delayedCall(props.time_delay, () => {
            timeline.reverse()
        })
    }

    const onCardClick = () => {
        props.update_flipped_cards(props.post_id);
        if (props.interaction_blocked) {
            return;
        }

        if (flipped && readMoreIsExpanded) {
            const delay = 0.5

            expandTimeline.reverse();
            props.update_opened_read_mores(props.post_id);

            TweenMax.delayedCall(delay, () => {
                timeline.reversed(! timeline.reversed());
                setFlipped(! timeline.reversed());
            })
        }
        else {
            timeline.reversed(! timeline.reversed());
            setFlipped(! timeline.reversed());
        }
    }

    const onReadMoreTriggerClick = () => {
        expandTimeline.reversed(! expandTimeline.reversed())
        setReadMoreIsExpanded(! readMoreIsExpanded);
        props.update_opened_read_mores(props.post_id);
    }

    return(
        <div className="card-wrapper">
            <div className="card" onClick={onCardClick} ref={cardElement}>
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

            <div className="read-more-wrapper" ref={wrapperElement}>
                <div className="card-description" ref={textWrapper}>
                    <p ref={textElement}>{props.card_text}</p>
                </div>
                <button className="read-more-trigger" onClick={onReadMoreTriggerClick}>Read more</button>
            </div>
        </div>
    );
}

export default Card;