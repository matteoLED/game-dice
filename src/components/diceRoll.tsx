import React, { useState } from "react";
import {
  FaDiceOne,
  FaDiceTwo,
  FaDiceThree,
  FaDiceFour,
  FaDiceFive,
  FaDiceSix,
} from "react-icons/fa";

const buttonStyles = {
  backgroundColor: "black",
  color: "white",
  padding: "10px",
  margin: "5px",
  borderRadius: "0.2rem",
  width: "92%",
  heigth: "100%",
  boxShadow: "none",
  border: "none",
  cursor: "pointer",
  fontSize: 16,
  fontWeight: "bold",
  letterSpacing: 0.25,
};

type RefreshIconProps = {
  size?: number;
  color?: string;
};

const RefreshIcon = ({ size = 24, color = "black" }: RefreshIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path
        fill={color}
        d="M16.59,7.58A8,8,0,1,0,20,12H18a6,6,0,1,1-3.91-5.39l-.5.86a5,5,0,1,0,8.11,5.39l2.24-2.24A1,1,0,0,0,23,8V3a1,1,0,0,0-1.71-.7l-2.24,2.24A7.93,7.93,0,0,0,16.59,7.58Z"
      />
    </svg>
  );
};

type DiceRollProps = {
  onRoll: (value: number) => void;
  onNextPlayer: () => void;
};

const DiceRoll = ({ onRoll }: DiceRollProps) => {
  const [diceValue, setDiceValue] = useState<number>(0);
  const [rollsCount, setRollsCount] = useState<number>(0);

  const rollDice = () => {
    const value = Math.floor(Math.random() * 6) + 1;
    setDiceValue(value);
    onRoll(value);

    // Augmenter le nombre de lancers de dé effectués
    const updatedRollsCount = rollsCount + 1;
    setRollsCount(updatedRollsCount);

    // Vérifier si le joueur a effectué deux lancers de dé
    if (updatedRollsCount === 2) {
      // Passer au joueur suivant (appeler une fonction de votre choix ici)
      setRollsCount(0);
    }
  };

  const renderDice = (value: number) => {
    switch (value) {
      case 1:
        return <FaDiceOne />;
      case 2:
        return <FaDiceTwo />;
      case 3:
        return <FaDiceThree />;
      case 4:
        return <FaDiceFour />;
      case 5:
        return <FaDiceFive />;
      case 6:
        return <FaDiceSix />;
      default:
        return null;
    }
  };

  return (
    <>
      <button style={buttonStyles} className="click" onClick={rollDice}>
        <RefreshIcon size={16} color="white" /> Roll Dice
      </button>
      <div className="icon">{renderDice(diceValue)}</div>
    </>
  );
};

export default DiceRoll;
