import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import Card from './components/Card';

function App() {
    const [triggerReset, setTriggerReset] = useState(false);
    const [flippedCards, setFlippedCards] = useState([]);
    const cards = [{id: 1, title: 'card 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}, {id: 2, title: 'card 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},{id: 3, title: 'card 3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}];
    const limit = 4;
    const outlines = [];

    for (let index = 0; index < limit; index++) {
        outlines.push(<div id={`outline-${index}`} className="outline"/>);
    }

    const onResetClick = () => {
        setTriggerReset(! triggerReset);
    }

    const updatedFlippedCards = (flippedCardId) => {
        const currentFlippedCards = [...flippedCards];
        const indexOfFlippedCard = currentFlippedCards.indexOf(flippedCards);

        if (indexOfFlippedCard === -1) {
            currentFlippedCards.push(flippedCards);
        }
        else {
            currentFlippedCards.splice(indexOfFlippedCard, 1);
        }

        setFlippedCards(currentFlippedCards);
    }

    return(
        <div className="App">
            <div className="container">
                <button onClick={onResetClick}>Reset</button>
            </div>
            <div className="container">
                {
                    cards.map((card, index) => {
                        return <Card
                            key={index}
                            order={index}
                            id={card.id}
                            title={card.title}
                            content={card.description}
                            triggerReset={triggerReset}
                            flippedCards={flippedCards}
                            />
                    })
                }
            </div>
        </div>
    );
}

export default App;
