import { useReducer } from "react";
import "../app.scss";
import StartScreen from "../components/StartScreen";
import Game from "../components/Game";

const initialState = {
  difficulty: null,
  images: [],
  status: "",
  clickedArr: [],
  clicked: "",
  score: 0,
  highscore: 0,
  start: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "difficulty":
      return {
        ...state,
        difficulty: action.payload,
        status: "ready",
      };
    case "getImages":
      return {
        ...state,
        status: "loaded",
        images: action.payload,
      };
    case "clickedImage":
      if (state.clickedArr.includes(action.payload))
        return { ...state, clickedArr: [], score: 0, highscore: state.score };
      return {
        ...state,
        clicked: action.payload,
        clickedArr: [...state.clickedArr, action.payload],
        status: state.clickedArr.includes(action.payload) ? "lose" : "continue",
        score: state.score + 1,
      };
    case "startGame":
      return {
        ...state,
        start: action.payload,
      };

    default:
      throw new Error("Unknown");
  }
}

function App() {
  const [
    {
      images,
      score,
      difficulty,
      status,
      clicked,
      clickedArr,
      highscore,
      start,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  console.log(clicked);
  console.log(clickedArr);
  console.log(status);
  return (
    <div>
      {!start && (
        <StartScreen difficulty={difficulty} dispatch={dispatch}>
          <button
            onClick={() => dispatch({ type: "startGame", payload: true })}
            className="btn btn-start"
          >
            Start Game!
          </button>
        </StartScreen>
      )}

      {start && (
        <Game
          dispatch={dispatch}
          score={score}
          images={images}
          highscore={highscore}
          status={status}
          difficulty={difficulty}
        />
      )}
    </div>
  );
}

export default App;
