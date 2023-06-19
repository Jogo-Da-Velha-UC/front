import React, { useState } from "react";
import api from "../../services/api";

import './Index.css';

const Board = () => {

    const [player, setPlayer] = useState('');
    const [playerOne, setPlayerOne] = useState('');
    const [playerTwo, setPlayerTwo] = useState('');
    const [matchId, setMatchId] = useState('');
    const [rol, setRol] = useState('');
    const [col, setCol] = useState('');

    async function createGame(e) {
        e.preventDefault();

        const data = {
            player
        };

        try {
            const response = await api.post('/api/v1/game/create-game', data);
            setMatchId(response.data.data.matchId)
            setPlayerOne(response.data.data.playerOne)
            setPlayerTwo(response.data.data.playerTwo)
        } catch (err) {
            alert('Insira os dados corretamente e tente novamente!!!');
        }
    };

    async function makeMove(e) {
        e.preventDefault();

        const data = {
            playerOne,
            matchId,
            rol,
            col
        };

        try {
            api.post('/api/v1/game/make-move', data);

            console.log(data)

        } catch (err) {
            alert('Insira os dados corretamente e tente novamente!!!');
        }
    };

    const getMoves = (rol, col) => {
        return (
            <button className="move" type={"submit"} onClick={() => moves(rol, col)}>X</button>
        );
    };

    function moves(rol, col) {
        console.log(rol, col)
        setCol(col)
        setRol(rol)
    };

    return (
        <div className="back-game">
            <h1>SUA VEZ ...</h1>
            <div className="score">
                <h3>Player 1</h3>
                <div id="board">
                    <div class="cell">{getMoves(0, 0)}</div>
                    <div class="cell">{getMoves(0, 1)}</div>
                    <div class="cell">{getMoves(0, 2)}</div>

                    <div class="cell">{getMoves(1, 0)}</div>
                    <div class="cell">{getMoves(1, 1)}</div>
                    <div class="cell">{getMoves(1, 2)}</div>

                    <div class="cell">{getMoves(2, 0)}</div>
                    <div class="cell">{getMoves(2, 1)}</div>
                    <div class="cell">{getMoves(2, 2)}</div>
                </div>
                <h3>Player 2</h3>
            </div>
        </div>
    );
};

export default Board;