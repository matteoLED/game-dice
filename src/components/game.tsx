import React, { useState } from "react";
import Player from "./player";
import { PlayerData } from "./playerData";
import DiceRoll from "./diceRoll";
import "../styles/game.css";

const buttonStyles = {
  backgroundColor: "black",
  color: "white",
  padding: "10px",
  margin: "0.3rem",
  borderRadius: "0.2rem",
  width: "22%",
  boxShadow: "none",
  border: "none",
  cursor: "pointer",
  fontSize: 16,
  fontWeight: "bold",
  letterSpacing: 0.25,
};
function resetGame() {
  return [
    { id: 1, globalScore: 0, roundScore: 0 },
    { id: 2, globalScore: 0, roundScore: 0 },
  ];
}

function Game() {
  const onNextPlayer = () => {
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextPlayerIndex);
  };
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [wins, setWins] = useState<number[]>([0, 0]);
  const [players, setPlayers] = useState<PlayerData[]>([
    { id: 1, globalScore: 0, roundScore: 0 },
    { id: 2, globalScore: 0, roundScore: 0 },
  ]);

  function restartGame() {
    setWins([0, 0]);
    setPlayers([
      { id: 1, globalScore: 0, roundScore: 0 },
      { id: 2, globalScore: 0, roundScore: 0 },
    ]);
    setCurrentPlayerIndex(0);
  }

  function updatePlayerScore(
    players: PlayerData[],
    currentPlayerIndex: number,
    value: number,
    isHold: boolean
  ) {
    const updatedPlayers = players.map((player, index) => {
      if (index === currentPlayerIndex) {
        let globalScore = player.globalScore;
        let roundScore = player.roundScore;
        if (isHold) {
          globalScore += roundScore;
          roundScore = 0;
        } else {
          roundScore += value;
        }
        return {
          ...player,
          globalScore,
          roundScore,
        };
      }
      return player;
    });

    const currentPlayer = updatedPlayers[currentPlayerIndex];
    if (currentPlayer.globalScore >= 100) {
      const updatedWins = [...wins];
      updatedWins[currentPlayerIndex] =
        (updatedWins[currentPlayerIndex] || 0) + 1;
      setWins(updatedWins);
      setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
      setWins(updatedWins);
      alert(`Le joueur ${currentPlayer.id} a gagné !`);
      setPlayers(resetGame);
    } else {
      const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
      setCurrentPlayerIndex(nextPlayerIndex);
      setPlayers(updatedPlayers);
    }
  }

  const rollDice = (value: number) => {
    // Mettre à jour le score du joueur en cours
    const updatedPlayers = players.map((player, index) => {
      if (index === currentPlayerIndex) {
        return {
          ...player,
          updatePlayerScore: player.globalScore + player.roundScore,
          roundScore: player.roundScore + value,
        };
      }
      return player;
    });

    // Si le joueur actuel a fait deux lancers, passer au joueur suivant
    if (value === 1 || value === 6) {
      const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
      setCurrentPlayerIndex(nextPlayerIndex);
    }

    // Mettre à jour les scores globaux si le joueur a atteint 100 points
    if (updatedPlayers) {
      setPlayers(updatedPlayers);
    }
  };

  return (
    <>
      <div className="game-container">
        <button style={buttonStyles} className="click" onClick={restartGame}>
          New Game
        </button>
        <>
          <div className="player-info-container">
            {players.map((player, index) => (
              <div>
                <Player
                  key={player.id}
                  player={player}
                  id={index + 1}
                  isActive={index === currentPlayerIndex}
                />
                <p className="player-info-container">
                  Score :
                  {currentPlayerIndex === index
                    ? player.roundScore
                    : player.globalScore}
                </p>
                <p key={player.id} className="player-info-container">
                  Wins: {wins[index] || 0}
                </p>
              </div>
            ))}
          </div>
          <button
            style={buttonStyles}
            className="click"
            onClick={() =>
              updatePlayerScore(players, currentPlayerIndex, 0, true)
            }
          >
            Hold
          </button>
        </>
        <div>
          <h2 className="player">
            Round of{" "}
            <span className={players[currentPlayerIndex] ? "active" : ""}>
              Player {players[currentPlayerIndex].id}
            </span>
          </h2>

          <DiceRoll onRoll={rollDice} onNextPlayer={onNextPlayer} />
        </div>
      </div>
    </>
  );
}

export default Game;
