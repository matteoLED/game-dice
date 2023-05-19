import React from "react";
import {
  FaDiceOne,
  FaDiceTwo,
  FaDiceThree,
  FaDiceFour,
  FaDiceFive,
  FaDiceSix,
} from "react-icons/fa";

interface DiceProps {
  value: number;
  rollDice?: () => void; // ajouter la propriété rollDice
}

const Dice: React.FC<DiceProps> = ({ value, rollDice }) => {
  const diceIcons = [
    <>
      <FaDiceOne className="dice-roll-container" />,
      <FaDiceTwo className="dice-roll-container" />,
      <FaDiceThree className="dice-roll-container" />,
      <FaDiceFour className="dice-roll-container" />,
      <FaDiceFive className="dice-roll-container" />,
      <FaDiceSix className="dice-roll-container" />,
    </>,
  ];

  return (
    <div className="dice" onClick={rollDice}>
      {diceIcons[value]}
    </div>
  );
};

export default Dice;
