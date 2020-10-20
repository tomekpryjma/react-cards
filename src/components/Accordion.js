import React, { useState, useRef, useEffect } from 'react';

export default function Accordion(props) {
    const [accordionActive, setAccordionActive] = useState(false);
    const [height, setHeight] = useState(0);
    const contentRef = useRef(null);

    useEffect(() => {
        props.notifyCardOfAccordionState(accordionActive);
        if (accordionActive) {
            setHeight(contentRef.current.scrollHeight);
            return;
        }
        setHeight(0);
    }, [accordionActive])

    useEffect(() => {
        if (! props.cardIsFlipped && accordionActive) {
            toggleAccordion();
        }
    }, [props.cardIsFlipped])

    const toggleAccordion = () => {
        setAccordionActive(! accordionActive);
    }

    return(
        <div
            className={`accordion ${accordionActive ? 'active' : ''} ${props.cardIsFlipped ? 'show' : ''}`}
            style={{transitionDelay: ! props.cardIsFlipped ? '0.5s' : ''}}
            >
            <button onClick={toggleAccordion}>Read more</button>
            <div className="accordion-inner" style={{height: height}}>
                <div className="accordion-content" ref={contentRef}>
                    {props.content}
                </div>
            </div>
        </div>
    );
}