import { useReducer } from "react";
import "../app.scss";
import StartScreen from "../components/StartScreen";
import Game from "../components/Game";
import WinModal from "./WinModal";

const initialState = {
  difficulty: null,
  images: [],
  clickedArr: [],
  clicked: "",
  score: 0,
  highscore: 0,
  start: false,
  end: false,
  winStatus: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "difficulty":
      return {
        ...state,
        difficulty: action.payload,
      };
    case "getImages":
      return {
        ...state,
        images: action.payload,
      };
    case "clickedImage":
      if (state.clickedArr.includes(action.payload))
        return {
          ...state,
          clickedArr: [],
          score: state.score,
          highscore:
            state.highscore > state.score ? state.highscore : state.score,
          end: true,
        };
      return {
        ...state,
        clicked: action.payload,
        clickedArr: [...state.clickedArr, action.payload],
        score: state.score + 1,
        end: false,
      };
    case "startGame":
      return {
        ...state,
        start: action.payload,
      };
    case "win":
      return {
        ...state,
        winStatus: action.payload,
        end: action.payload,
        highscore:
          state.highscore > state.score ? state.highscore : state.score,
      };
    case "restart":
      return {
        ...state,
        difficulty: action.payload,
        score: 0,
        highscore: state.highscore,
        start: true,
        end: false,
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
      clicked,
      clickedArr,
      highscore,
      start,
      end,
      winStatus,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
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
          difficulty={difficulty}
          winStatus={winStatus}
        />
      )}
      (
      {end && (
        <WinModal
          winStatus={winStatus}
          dispatch={dispatch}
          score={score}
          highscore={highscore}
        />
      )}
      )
    </div>
  );
}

export default App;
