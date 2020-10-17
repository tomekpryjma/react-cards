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
    const cardsRoute = urlBase + wpRestNamespace + '/cards-votive';
    const cardsParams = {params: {per_page: 100}};

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
    );
}

export default App;
