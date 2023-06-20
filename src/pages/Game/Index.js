import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import api from "../../services/api";

import './Index.css';

const Board = () => {

    const [player, setPlayer] = useState('');
    const [playerOne, setPlayerOne] = useState('');
    const [playerTwo, setPlayerTwo] = useState('');
    const { gameId } = useParams(); 
    const navigate = useNavigate();
    var rol = null;
    var col = null;


    async function getGame() {

        try {
            const response = await api.get(`/api/v1/game/${gameId}`);
            setPlayerOne(response.data.data.playerOne.nickName);
            setPlayerTwo(response.data.data.playerTwo.nickName);
            setPlayer(response.data.data.playerOne.nickName)
           
        } catch (err) {
            alert('Insira os dados corretamente e tente novamente!!!');
        }
    };

    function switchPlayer(player) {
        return player === playerOne ? "X" : "O" 
    };

    async function makeMove() {
        var matchId = parseInt(gameId, 10);
        const data = {
            player,
            matchId,
            rol,
            col
        };

        try {
            const responseMove = await api.post('/api/v1/game/make-move', data)
            console.log(responseMove.data)

            var winner = responseMove.data.data.statusMatch.winner;
            var status = responseMove.data.data.statusMatch.statusMatchEnum;
            if(winner !== null){
                alert("O jogador " + winner.nickName + " ganhou")
                navigate("/",{ replace: true })
            }

            if(status !== null && status === "DRAW"){
                alert("O jogo empatou")
                navigate("/",{ replace: true })
            }
        } catch (err) {
            alert('Insira os dados corretamente e tente novamente!!!');
        }
    };

    const getMoves = (linha, coluna, cell) => {
        return (
            <form>
                <button className="move" type={"submit"} onClick={() => moves(linha, coluna, cell)}></button>
            </form>
        );
    };

    function moves(linha, coluna, cell) {
        col = coluna
        rol = linha
        makeMove();
        document.getElementById(cell).textContent = player === playerOne ? "X" : "O";
        if(player === playerOne){
            setPlayer(playerTwo);
        }else{
            setPlayer(playerOne)
        }
    };

    useEffect(() => {
        getGame();
    }, [])

    return (
        <div className="back-game">
            <h1>SUA VEZ  {player.toUpperCase()}</h1>
            <div className="score">
                <h3>Player 1 {playerOne.toUpperCase()}</h3>
                <div id="board">
                    <div class="cell" id="cell1">{getMoves(0, 0, "cell1")}</div>
                    <div class="cell" id="cell2">{getMoves(0, 1, "cell2")}</div>
                    <div class="cell" id="cell3">{getMoves(0, 2, "cell3")}</div>

                    <div class="cell" id="cell4">{getMoves(1, 0, "cell4")}</div>
                    <div class="cell" id="cell5">{getMoves(1, 1, "cell5")}</div>
                    <div class="cell" id="cell6">{getMoves(1, 2, "cell6")}</div>

                    <div class="cell" id="cell7">{getMoves(2, 0, "cell7")}</div>
                    <div class="cell" id="cell8">{getMoves(2, 1, "cell8")}</div>
                    <div class="cell" id="cell9">{getMoves(2, 2, "cell9")}</div>
                </div>
                <h3>Player 2 {playerTwo.toUpperCase()}</h3>
            </div>
        </div>
    );
};

export default Board;