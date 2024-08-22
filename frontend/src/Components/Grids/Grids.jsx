import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Card from "../Card/Card";
import './Grids.css';
import isWinner from "../../Helpers/checkWinners";

const socket = io('http://localhost:5000'); // Replace with your backend server URL

function Grids({ numberOfCards = 9 }) {
    const [board, setBoard] = useState(Array(numberOfCards).fill(""));
    const [turn, setTurn] = useState(false);
    const [winner, setWinner] = useState(null);
    const [room, setRoom] = useState('defaultRoom'); // You can set this dynamically if needed

    useEffect(() => {
        socket.emit('joinGame', room);

        socket.on('moveMade', (data) => {
            setBoard(data.board);
            setTurn(data.isXNext);
        });

        socket.on('gameReset', () => {
            setWinner(null);
            setTurn(false);
            setBoard(Array(numberOfCards).fill(""));
        });

        return () => {
            socket.off('moveMade');
            socket.off('gameReset');
        };
    }, [room]);

    function play(idx) {
        if (board[idx] || winner) return; // Prevent overriding and playing after the game ends

        const newBoard = [...board];
        newBoard[idx] = turn ? 'O' : 'X';
        setBoard(newBoard);

        const win = isWinner(newBoard, turn ? 'O' : 'X');
        if (win) {
            setWinner(turn ? 'O' : 'X');
        } else {
            setTurn(!turn);
        }

        socket.emit('makeMove', { room, board: newBoard, isXNext: !turn });
    }

    function reset() {
        socket.emit('resetGame', room);
    }

    return (
        <div className="grid-wrapper">
            <h1 className="turn-highlight heading">Tic Tac Toe</h1>
            <div className="wrap">
                <div className="turn-highlight">Current Turn: {turn ? 'O' : 'X'}</div>
                {winner && <div className="winner-highlight">Winner is: {winner}</div>}
            </div>
            <div className="Grid">
                {board.map((player, idx) => (
                    <Card key={idx} onPlay={play} index={idx} player={player} />
                ))}
            </div>
            <button className="reset" onClick={reset}>Reset Game</button>
        </div>
    );
}

export default Grids;
