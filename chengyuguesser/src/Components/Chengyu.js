import getChengyuList from "../getChengyuList";
import { useEffect, useState } from "react";

const Chengyu = () => {
  const [selectedChengyu, setSelectedChengyu] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showPinyin, setShowPinyin] = useState(false);
  const [showEnglish, setShowEnglish] = useState(false);
  const [guess, setGuess] = useState("");
  const [characters, setCharacters] = useState(["_", "_", "_", "_"]);
  const [randomIndex, setRandomIndex] = useState("");

  const setGameStartingState = () => {
    setSelectedChengyu(getChengyuList()[Math.floor(Math.random() * 100)]);
    setGameStarted(true);
    setGameWon(false);
    setShowPinyin(false);
    setShowEnglish(false);
    setCharacters(["_", "_", "_", "_"]);
  };

  const revealCharacter = () => {
    let randomIndex2 = Math.floor(Math.random() * 4);
    if (characters[randomIndex2] === "_") {
      let charsCopy = [...characters];
      charsCopy[randomIndex2] = selectedChengyu.chengyu[randomIndex2];
      setCharacters(charsCopy);
    } else {
      revealCharacter();
    }
  };

  if (!gameStarted) {
    return (
      <div>
        <button
          className="bg-purple-200 border border-purple-700 text-purple-800 px-2 py-1 rounded-md text-2xl"
          onClick={setGameStartingState}
        >
          Play
        </button>
      </div>
    );
  } else if (gameStarted && selectedChengyu) {
    return (
      <div className="text-center">
        <h2 className="text-5xl font-bold mb-2 tracking-widest">
          {characters}
        </h2>

        {showPinyin && <p className="text-lg mb-2">{selectedChengyu.pinyin}</p>}
        {showEnglish && (
          <p className="text-lg">{selectedChengyu.english_explanation}</p>
        )}
        {!gameWon ? (
          <div>
            <input
              className="text-center border h-12 w-48 rounded-md mt-5"
              type="text"
              placeholder={"Type your guess"}
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
            />
            <button
              onClick={(e) => {
                setGuess(e.target.value);
                if (guess == selectedChengyu.chengyu) {
                  console.log("You got it");
                  setGameWon(true);
                } else {
                  console.log("oops try again");
                }
              }}
              className="border px-2 py-1 h-12 rounded-md ml-1"
            >
              Guess
            </button>
          </div>
        ) : (
          <div>
            <p className="text-3xl text-purple-600 mt-2">Woo you got it!</p>
            <button
              onClick={setGameStartingState}
              className="mt-5 bg-green-200 border border-green-700 text-green-800 px-2 py-1 rounded-md"
            >
              Play again
            </button>
          </div>
        )}
        <div>
          <button
            onClick={revealCharacter}
            className="mt-5 bg-purple-200 border border-purple-700 text-purple-800 px-2 py-1 rounded-md"
          >
            Reveal a Character
          </button>
        </div>
        <div>
          <button
            className="mt-2 bg-purple-200 border border-purple-700 text-purple-800 px-2 py-1 rounded-md"
            onClick={() => setShowPinyin(true)}
          >
            Show Pinyin
          </button>
        </div>
        <div>
          <button
            className="mt-2 bg-purple-200 border border-purple-700 text-purple-800 px-2 py-1 rounded-md"
            onClick={() => setShowEnglish(true)}
          >
            Show English Translation
          </button>
        </div>
      </div>
    );
  }
};

export default Chengyu;
