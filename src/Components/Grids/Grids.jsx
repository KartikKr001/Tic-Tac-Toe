import {useState} from "react";
import Card from "../Card/Card";
import '../Grids/Grids.css'
import isWinner from "../../Helpers/checkWinners";



function Grids({ numberOfCards }){
    const [board,setBoard] = useState(Array(numberOfCards).fill(""));
    const [turn,setTurn] = useState(false);
    const [winner,setWinner] = useState(null);
    
    // false -> X , true -> O
    function play(idx){
        if(turn){
            board[idx] = 'O';

        }
        else{
            board[idx] = 'X';
        }
        const win = isWinner(board,(turn)?'O':'X');
        if(win){
            setWinner((turn)?'O':'X');
            return;
        }
        setBoard([...board]);
        setTurn(!turn);
    }

    function reset(){
        setWinner(null);
        setTurn(false);
        setBoard(Array(numberOfCards).fill(""));
    }
    return (
        <div className="grid-wrapper">
            <div className="wrap">
                <div className="turn-highlight">Current Turn : {(turn == false)? 'X' : 'O'}</div>
                {
                    (winner) && (
                        <div className="winner-highlight">Winner is : {winner}</div>
                    )
                }
            </div>
            <div className="Grid">
                {board.map((ele,idx) => <Card key={idx} onPlay={play} index={idx} player={ele}/>)}
            </div>
            <button className="reset" onClick={reset}>Reset Game</button>
        </div>
    );
}

export default Grids;