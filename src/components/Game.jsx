/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

function Game({ images, dispatch, score, highscore, status }) {
  const [gameImages, setGameImages] = useState(images);
  const [shuffled, setShuffled] = useState(false);

  useEffect(() => setGameImages(images), [images]);

  // Image shuffling algorithm
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  function getRandomIndexList(arrayLength) {
    const indices = Array.from({ length: arrayLength }, (_, index) => index);
    shuffleArray(indices);
    return indices;
  }

  const arrayLength = gameImages.length;

  const randomIndexList = getRandomIndexList(arrayLength);
  const shuffledImages = randomIndexList.map((index) => images[index]);

  function handleImageClick(img) {
    setTimeout(() => setGameImages(shuffledImages), 350);
    setShuffled((status) => !status);
    console.log(img.id);
    dispatch({ type: "clickedImage", payload: img.id });
  }
  useEffect(() => {
    async function fetchWaifu() {
      try {
        const res = await fetch(
          "https://api.jikan.moe/v4/characters/2/pictures"
        );
        const data = await res.json();
        dispatch({ type: "getImages", payload: data.data });
        data.data.map((item) => {
          item.id = `id-${Math.floor(
            Math.random() * Math.floor(Math.random() * Date.now())
          )}`;
        });
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchWaifu();
  }, [dispatch]);
  return (
    <>
      <div className="scores">
        <h1 className="score">Score: {score}</h1>
        <h1 className="highscore">HighScore: {highscore}</h1>
      </div>
      <div className="game">
        {gameImages.map((img, i) => (
          <img
            onClick={() => handleImageClick(img)}
            className={`game-image ${shuffled ? "animation" : "animation-2"}`}
            key={i}
            src={img.jpg.image_url}
            alt="img"
          ></img>
        ))}
      </div>
    </>
  );
}

export default Game;
