/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

function Game({ images, dispatch }) {
  const [gameImages, setGameImages] = useState(images);
  useEffect(() => setGameImages(images), [images]);
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

  useEffect(() => {
    async function fetchWaifu() {
      try {
        const res = await fetch(
          "https://api.jikan.moe/v4/characters/2/pictures"
        );
        const data = await res.json();
        dispatch({ type: "getImages", payload: data.data });
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchWaifu();
  }, [dispatch]);
  return (
    <div className="game">
      {gameImages.map((img, i) => (
        <img
          onClick={() => setGameImages(shuffledImages)}
          className="game-image"
          key={i}
          src={img.jpg.image_url}
          alt="img"
        ></img>
      ))}
    </div>
  );
}

export default Game;
