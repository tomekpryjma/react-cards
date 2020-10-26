import React, { useState, useRef, useEffect } from 'react';

export default function Accordion(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [height, setHeight] = useState(0);
    const contentRef = useRef(null);
    const { cardIsFlipped, closeAccordion, updateIsAccordionOpen } = props;
    
    useEffect(() => {
        if (closeAccordion) {
            setIsOpen(false);
        }
    }, [closeAccordion])

    useEffect(() => {
        updateIsAccordionOpen(isOpen)

        if (isOpen) {
            setHeight(contentRef.current.scrollHeight);
        }
        else {
            setHeight(0);
        }

    }, [isOpen])

    const onButtonClick = () => {
        setIsOpen(! isOpen);
    }

    return(
        <div
            className={`accordion ${cardIsFlipped ? 'show' : ''}`}
            >
            <button onClick={onButtonClick}>Read more</button>
            <div className="accordion-inner" style={{height: height}}>
                <div className="accordion-content" ref={contentRef}>
                    {props.content}
                </div>
            </div>
        </div>
    );
}