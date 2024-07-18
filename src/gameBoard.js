// src/GameBoard.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import './gameBoard.css';

const initialBoard = Array(9).fill(null);

const GameBoard = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleRestart = () => {
    setBoard(initialBoard);
    setIsXNext(true);
  };

  const renderSquare = (index) => (
    <motion.button
      className="square btn  btn-square btn-outline w-24 h-24 text-3xl"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => handleClick(index)}
      key={index}
    >
      {board[index]}
    </motion.button>
  );
  const isBoardFull = board.every((square) => square !== null);
  return (
    <div className="game-board flex flex-col items-center mt-10">
      <div className='text-4xl mb-4 text-center'>TIC-TAC-TOE</div>
      <div className="status text-2xl mb-4">
      
      {winner ? `Winner: ${winner}` : isBoardFull ? 'It\'s a Draw!' : `Next player: ${isXNext ? 'X' : 'O'}`}
      </div>
      <div className="grid grid-cols-3 gap-4 w-full">
        {board.map((_, index) => renderSquare(index))}
      </div>
      <AnimatePresence>
        {winner && (
          <motion.div
            className="winner-message"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            🎉 {winner} Wins! 🎉
          </motion.div>
        )}
      </AnimatePresence>
      {winner && <Confetti />}
      <motion.button
        className="btn btn-outline mt-4"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleRestart}
      >
        Restart Game
      </motion.button>
    </div>
  );
};

const calculateWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
};

export default GameBoard;
