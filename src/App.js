import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss';
import Card from './components/Card';
require('dotenv').config();

function App() {
    const [reset, setReset] = useState(false);
    const [cards, setCards] = useState([]);
    const [cardBackground, setCardBackground] = useState({});
    const [cardInteractionBlocked, setCardInteractionBlocked] = useState(false);
    const [openedReadMores, setOpenedReadMores] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const urlBase = process.env.REACT_APP_DOMAIN;
    const customRestNamespace = '/wp-json/barker/v1';
    const cardBackgroundRoute = urlBase + customRestNamespace + '/card-background';
    const cardsRoute = urlBase + customRestNamespace + '/random-cards';
    const cardsParams = {params: {limit: 3, post_type: 'cards-votive'}};

    useEffect(() => {
        axios.get(cardBackgroundRoute).then(response => {
            setCardBackground(response.data);
        });

        getCards();
    }, []);

    const getCards = () => {
        axios.get(cardsRoute, cardsParams).then(response => {
            setCards(response.data);
        });
    }

    const handleResetClick = () => {
        let resetTimeDelay = 0;
        if (openedReadMores.length || flippedCards.length) {
            resetTimeDelay = 3800;
        }

        setOpenedReadMores([]);
        setFlippedCards([]);
        setReset(true);
        setCardInteractionBlocked(true);
        setTimeout(() => {
            getCards();
            setReset(false);
            setCardInteractionBlocked(false);
        }, resetTimeDelay);
    }

    const updateOpenedOrFlippedState = (state, setState, postId) => {
        const temp = [...state];
        const existingReadMoreIndex = temp.indexOf(postId);

        if (existingReadMoreIndex == -1) {
            temp.push(postId);
        }
        else {
            temp.splice(existingReadMoreIndex, 1);
        }

        setState(temp);
    }

    return (
        <div className="App">
            <button onClick={handleResetClick}>Shuffle</button>
            <div className="card-container">
                {
                    cards.map((card, index) => {
                        const time_delay = (index + 1) * 0.35;
                        return(
                            <Card
                                reset={reset}
                                key={index}
                                post_id={card.ID}
                                card_title={card.post_title}
                                card_image_url={card.card_image_url}
                                card_background_url={cardBackground}
                                card_text={card.card_text}
                                time_delay={time_delay}
                                interaction_blocked={cardInteractionBlocked}
                                update_opened_read_mores={(postId) => {updateOpenedOrFlippedState(openedReadMores, setOpenedReadMores, postId)}}
                                update_flipped_cards={(postId) => {updateOpenedOrFlippedState(flippedCards, setFlippedCards, postId)}}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
}

export default App;
