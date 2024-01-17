import React, { useEffect, useState } from "react";
import { requestPastriesWon } from "../store/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import "../styles/game.scss";

function GamePage() {
  const dispatch = useDispatch();
  const { pastriesWon } = useSelector((store) => store.gameSliceReducer);
  const [diceResults, setDiceResults] = useState(Array(5).fill(1));
  const [remainingAttempts, setRemainingAttempts] = useState(3);

  const handleClick = () => {
    const results = throwDices();
    setDiceResults(results);
    const nbPastriesWon = checkVictory(results);

    if (nbPastriesWon != 0) {
      dispatch(requestPastriesWon(nbPastriesWon));
    } else {
      console.log("Vous n'avez rien gagné... Retentez votre chance !");
    }

    setRemainingAttempts(remainingAttempts - 1);

    if (remainingAttempts === 1) {
      console.log("Dernier essai !");
    }

    if (remainingAttempts === 0) {
      console.log("Fin des essais. Désactivez le bouton ici.");
    }
  };

  const checkVictory = (results) => {
    const occurrences = results.reduce((acc, result) => {
      acc[result] = (acc[result] || 0) + 1;
      return acc;
    }, {});

    const values = Object.values(occurrences);

    if (values.some((count) => count === 2)) {
      if (values.filter((count) => count === 2).length === 2) {
        return 2; 
      } else {
        return 1; 
      }
    } else if (values.some((count) => count === 3)) {
      if (values.some((count) => count === 2)) {
        return 3; 
      } else {
        return 2; 
      }
    } else if (values.some((count) => count === 4)) {
      return 3; 
    }
    return 0; 
  };

  const renderImages = () => {
    return diceResults && diceResults.map((result, index) => (
      <img
        className='de'
        key={index}
        src={`/public/de${result}.jpg`}
        alt={`Dé ${result}`}
      />
    ));
  };

  const throwDices = () => {
    const results = [];

    for (let i = 0; i < 5; i++) {
      const diceResult = Math.floor(Math.random() * 6) + 1;
      results.push(diceResult);
    }
    return results;
  };

  return (
    <>
      <div className="game">
        <h1>Jeu du Yams</h1>
        <div className="rules">
          <p>Vous avez 3 lancés :</p>
          <ul>
            <li>
              Si vous obtenez <span>une paire</span>, vous gagnez{" "}
              <span>une pâtisserie</span>
            </li>
            <li>
              Si vous obtenez <span>un brelan</span>, vous gagnez{" "}
              <span>deux pâtisseries</span>
            </li>
            <li>
              Si vous obtenez <span>un carré</span>, vous gagnez{" "}
              <span>trois pâtisseries</span>
            </li>
          </ul>
        </div>
        <button onClick={handleClick} disabled={remainingAttempts === 0}>
          Lancer les dés ({remainingAttempts} essais restants)</button>
        <ul className="results">
          <p>Vous avez gagné,</p>
          {pastriesWon && pastriesWon.length > 0 ? (
            pastriesWon.map((pastry, index) => (
              <li key={pastry.id} className="win">
                <span>1</span> {pastry.name}
              </li>
            ))
          ) : (
            <li>Aucune pâtisserie pour le moment.</li>
          )}
        </ul>
      </div>

      <div className="container">
        <div>{renderImages()}</div>
        <div>
          <ul>
            {pastriesWon.length > 0 &&
              pastriesWon.map((pastrie, index) => (
                <li key={pastrie.id}>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default GamePage;