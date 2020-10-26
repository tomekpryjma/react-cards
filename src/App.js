import React, { useEffect, useState } from 'react';
import './App.scss';
import axios from 'axios';
import Card from './components/Card';

function App() {
    const [triggerReset, setTriggerReset] = useState(false);
    const [flippedCards, setFlippedCards] = useState([]);
    const [flippedCardsLength, setFlippedCardsLength] = useState(0);
    const [cardBackground, setCardBackground] = useState({});
    const [cards, setCards] = useState([]);
    const resetTimeDelay = 800;
    const urlBase = 'https://garrybarkeronline.com/';
    const customRestNamespace = '/wp-json/barker/v1';
    const cardBackgroundRoute = urlBase + customRestNamespace + '/card-background';
    let cardsRoute = urlBase + customRestNamespace + '/random-cards';
    const cardsParams = {params: {limit: 3, post_type: 'cards-votive'}};
    
    useEffect(() => {
        axios.get(cardBackgroundRoute).then(response => {
            setCardBackground(response.data);
        });
        getCards();
    }, []);

    useEffect(() => {
        if (! flippedCardsLength && triggerReset) {
            const timeout = setTimeout(() => {
                setTriggerReset(false);
                getCards();
                clearTimeout(timeout);
            }, resetTimeDelay / 2)
        }
    }, [flippedCardsLength])

    const getCards = () => {
        cardsRoute += '?cache-buster=' + Date.now();
        axios.get(cardsRoute, cardsParams).then(response => {
            setCards(response.data);
        });
    }

    const onResetClick = () => {
        if (flippedCardsLength) {
            setTriggerReset(true);
        }
    }

    const updateFlippedCards = (cardId) => {
        const currentFlippedCards = flippedCards;
        const indexOfFlippedCard = currentFlippedCards.indexOf(cardId);

        if (indexOfFlippedCard === -1) {
            currentFlippedCards.push(cardId);
        }
        else {
            currentFlippedCards.splice(indexOfFlippedCard, 1);
        }

        currentFlippedCards.sort((a, b) => a - b);
        setFlippedCards(currentFlippedCards);
        setFlippedCardsLength(currentFlippedCards.length);
    }

    return(
        <div className="App">
            <div className="container">
                <button onClick={onResetClick}>
                    {triggerReset ? 'Resetting...' : 'Ready to reset'}
                </button>
            </div>
            <div className="container">
                {
                    cards.map((card, index) => {
                        return <Card
                            key={index}
                            id={index}
                            cardImage={card.card_image_url}
                            cardBackground={cardBackground}
                            title={card.post_title}
                            content={card.card_text}
                            triggerReset={triggerReset}
                            flippedCards={flippedCards}
                            updateFlippedCards={updateFlippedCards}
                            resetTimeDelay={resetTimeDelay}
                            />
                    })
                }
            </div>
        </div>
    );
}

export default App;
