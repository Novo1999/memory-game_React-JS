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

    default:
      throw new Error("Unknown");
  }
}

function App() {
  const [
    { images, score, difficulty, status, clicked, clickedArr, highscore },
    dispatch,
  ] = useReducer(reducer, initialState);

  console.log(clicked);
  console.log(clickedArr);
  console.log(status);
  return (
    <div>
      {/* <StartScreen state={state} dispatch={dispatch} /> */}
      <Game
        dispatch={dispatch}
        score={score}
        images={images}
        highscore={highscore}
        status={status}
      />
    </div>
  );
}

export default App;
