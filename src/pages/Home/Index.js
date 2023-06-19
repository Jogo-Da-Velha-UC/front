import React from "react";
import Main_header from "../../components/Main_header/Index";
import api from "../../services/api";
import { useNavigate } from 'react-router-dom';

import { useState } from "react";

import './Index.css';

function Home() {
    const [playerOne, setPlayerOne] = useState('');
    const [playerTwo, setPlayerTwo] = useState('');
    const navigate = useNavigate();

    async function createGame(e) {
        e.preventDefault();

        const data = {
            playerOne,
            playerTwo
        };

        try {
            const response = await api.post('/api/v1/game/create-game', data);
            localStorage.setItem('game', data);
            navigate("/game", { replace: true });
        } catch (err) {
            alert('Insira os dados corretamente e tente novamente!!!');
        }
    };

    return (
        <div className="home-back">
            <Main_header 
                title={"JOGO DA VELHA"}
                backgorund={"#af3c3c"}
            />

                <form id="informations" onSubmit={createGame}>
                    <h2>APELIDOS</h2>
                    <div className="box-player">
                        <label>Player 1</label>
                        <input
                            className="field"
                            type="text"
                            onChange={e => setPlayerOne(e.target.value)}
                        />
                    </div>
                    <div className="box-player">
                        <label>Player 2</label>
                        <input
                            className="field"
                            type="text"
                            onChange={e => setPlayerTwo(e.target.value)}
                        />
                    </div>
                    <div className="div-btn">
                        <input
                            className="btn-home" 
                            type="submit"
                            value="INICIAR PARTIDA"
                        />
                    </div>
                </form>
        </div>
    );
};

export default Home;