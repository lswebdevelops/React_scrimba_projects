import { useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import React from "react";
import Confetti from "react-confetti";

export default function Tenzies() {
  // function  generateAllNewDice
  const generateAllNewDice = () => {
    // empty array
    const array = [];
    // loop> 10
    for (let i = 0; i < 10; i++) {
      //random number { /value/ isheld/ id}
      const randomNumber = {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      };
      // push rn to array
      array.push(randomNumber);
    }
    return array;
  };

  // state
  const [dice, setDice] = useState(() => generateAllNewDice());

  let gameWon = false;

  if (
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value)
  ) {
    gameWon = true;
  }

  // function rollDice . > change state:  generateAllNewDice to state
  const rollDice = () => {
    if (!gameWon) {
        setDice((oldDice) =>
            oldDice.map((die) =>
              die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
            )
          );
    }else {
        setDice(generateAllNewDice())
    }
  };

  // hold when clicked
  const holdColor = (id) => {
    setDice((prevState) =>
      prevState.map((item) => {
        return item.id === id ? { ...item, isHeld: !item.isHeld } : item;
      })
    );
  };
  // create  diceElements  > add props for Die.jsx
  const diceElements = dice.map((dieObject) => (
    <Die
      holdColor={holdColor}
      key={dieObject.id}
      isHeld={dieObject.isHeld}
      value={dieObject.value}
      id={dieObject.id}
    />
  ));

  return (
    <main>
      {gameWon && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. </p>
      <p className="instructions">
        Click each die to freeze it at its current value between rolls.
      </p>

      <div className="dice-container">{diceElements}</div>
      <button
        onClick={rollDice}
        className="roll-dice"
        style={gameWon ? { backgroundColor: "green" } : null}
      >
        {gameWon ? "New Game" : "Roll the Dice"}
      </button>
    </main>
  );
}
