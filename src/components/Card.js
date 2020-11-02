import React, { useEffect, useState } from 'react';
import Accordion from './Accordion';

function Card(props) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [closeAccordion, setCloseAccordion] = useState(false);
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const {
        id,
        updateFlippedCards,
        triggerReset,
        flippedCards,
        resetTimeDelay,
        cardBackground,
        cardImage
    } = props;

    useEffect(() => {
        if (triggerReset && flippedCards.indexOf(id) !== -1) {
            reset();
        }
    }, [triggerReset])

    const reset = async () => {
        await new Promise(() => {
            const timeout = setTimeout(() => {
                closeAccordionAndFlipCardOver();
                clearTimeout(timeout);
            }, flippedCards.indexOf(id) * resetTimeDelay);
        });
    }

    const onCardInnerClick = () => {
        if (triggerReset) {
            return;
        }
        if (! isFlipped) {
            setIsFlipped(true);
        }
        else {
            closeAccordionAndFlipCardOver();
        }
        updateFlippedCards(id);
    }

    const closeAccordionAndFlipCardOver = () => {
        if (! isAccordionOpen && isFlipped) {
            setIsFlipped(false);
        }
        else if (isAccordionOpen && isFlipped) {
            const delay = 250;
            setCloseAccordion(true);
            const timeout = setTimeout(() => {
                setIsFlipped(false);
                setCloseAccordion(false);
                clearTimeout(timeout);
            }, delay)
        }

        if (triggerReset && flippedCards.indexOf(id) !== -1) {
            updateFlippedCards(id);
        }
    }

    return(
        <div className="card">
            <div
                onClick={onCardInnerClick}
                className={`card-inner ${isFlipped ? 'flip' : ''}`}>
                <div className="card-front" style={{backgroundImage: `url(${cardImage})`}}>
                    <p>{ props.description }</p>
                </div>

                <div className="card-back" style={{backgroundImage: `url(${cardBackground})`}}></div>
            </div>
            <Accordion
                content={props.content}
                cardIsFlipped={isFlipped}
                updateIsAccordionOpen={(bool) => setIsAccordionOpen(bool)}
                closeAccordion={closeAccordion}
            />
        </div>
    );
}

export default Card;