import { useReducer } from "react";
import "../app.scss";
import StartScreen from "../components/StartScreen";

const initialState = {
  difficulty: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "difficulty":
      return {
        ...state,
        difficulty: action.payload,
        status: "ready",
      };
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state.difficulty);
  return (
    <div>
      <StartScreen state={state} dispatch={dispatch} />
    </div>
  );
}

export default App;
