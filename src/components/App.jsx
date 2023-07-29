import { useReducer } from "react";
import "../app.scss";
import StartScreen from "../components/StartScreen";
import Game from "../components/Game";

const initialState = {
  difficulty: null,
  images: [],
  status: "",
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
  }
}

function App() {
  const [{ images, difficulty, status }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div>
      {/* <StartScreen state={state} dispatch={dispatch} /> */}
      <Game dispatch={dispatch} images={images} />
    </div>
  );
}

export default App;
