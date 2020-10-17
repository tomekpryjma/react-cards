import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss';
import Card from './components/Card';
require('dotenv').config();

function App() {
    const [cards, setCards] = useState([]);
    const [cardBackground, setCardBackground] = useState({});
    const urlBase = process.env.REACT_APP_DOMAIN;
    const customRestNamespace = '/wp-json/barker/v1';
    const wpRestNamespace = '/wp-json/wp/v2';
    const cardBackgroundRoute = urlBase + customRestNamespace + '/card-background';
    const cardsRoute = urlBase + customRestNamespace + '/random-cards';
    const cardsParams = {params: {limit: 3, post_type: 'cards-votive'}};

    useEffect(() => {
        axios.get(cardBackgroundRoute).then(response => {
            setCardBackground(response.data);
        });

        axios.get(cardsRoute, cardsParams).then(response => {
            console.log(response)
            setCards(response.data);
        });
    }, []);

    return (
        <div className="App">
            <div class="card-container">
                {
                    cards.map((card, index) => {
                        return(
                            <Card
                                key={index}
                                card_image_url={card.card_image_url}
                                card_background_url={cardBackground}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
}

export default App;
