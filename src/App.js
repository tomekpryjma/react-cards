import React, { useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import Card from './components/Card';

function App() {
    const cards = [{title: 'card 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}, {title: 'card 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}];
    const limit = 4;
    const outlines = [];

    for (let index = 0; index < limit; index++) {
        outlines.push(<div id={`outline-${index}`} className="outline"/>);
    }

    return(
        <div className="App">
            <div className="container">
                {
                    cards.map(card => {
                        return <Card title={card.title} content={card.description}/>
                    })
                }
            </div>
        </div>
    );
}

export default App;
