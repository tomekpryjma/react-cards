import React, { useEffect, useState } from 'react';
import Accordion from './Accordion';

function Card(props) {
    const [cardIsFlipped, setCardIsFlipped] = useState(false);
    const [delayFlipBack, setDelayFlipBack] = useState(0);

    useEffect(() => {
        let updatedDelay = props.order * 0.5;
        if (delayFlipBack) {
            updatedDelay = props.order * delayFlipBack;
        }
        if (props.triggerReset) {
            // setDelayFlipBack(updatedDelay);
            const timeout = setTimeout(() => {
                setCardIsFlipped(false);
                clearTimeout(timeout);
            }, props.order * 1000)
        }
        console.log(props.triggerReset);
        // setDelayFlipBack(0);
    }, [props.triggerReset]);

    useEffect(() => {
        console.log(delayFlipBack)
    }, [delayFlipBack])

    const handleCardInnerClick = () => {
        const opposite = ! cardIsFlipped;
        setCardIsFlipped(opposite);
    }

    const notifyCardOfAccordionState = (accordionActive) => {
        if (accordionActive) {
            setDelayFlipBack(1);
            return;
        }
        setDelayFlipBack(0);
    }

    return(
        <div className="card">
            <div
                className={`card-inner ${cardIsFlipped ? 'flip' : ''}`}
                onClick={handleCardInnerClick}
                style={{transitionDelay: `${delayFlipBack}s`}}
                >
                <div className="card-front">
                    <h3>{ props.title }</h3>
                    <p>{ props.description }</p>
                </div>

                <div className="card-back"></div>
            </div>
            <Accordion
                title={props.title}
                content={props.content}
                cardIsFlipped={cardIsFlipped}
                notifyCardOfAccordionState={notifyCardOfAccordionState}
                delayFlipBack={delayFlipBack}
                triggerReset={props.triggerReset}
            />
        </div>
    );
}

export default Card;