/* eslint-disable react/prop-types */
function StartScreen({ difficulty, status, dispatch, children }) {
  function handleDifficulty(e) {
    if (!e.target.value) return;
    dispatch({ type: "difficulty", payload: e.target.value });
  }
  return (
    <div className="start__screen">
      <div>
        <h1>
          <span className="welcome">Welcome</span> to 🧠Memory Game !
        </h1>
        <h1>Select Difficulty</h1>
        <h1 className="start__screen-down-arrow">🔽</h1>
        <div className="start__screen-btn">
          <div onClick={(e) => handleDifficulty(e)} className="btn-group">
            <button
              value="easy"
              className={`btn btn-ui ${
                difficulty === "easy" ? "selected" : ""
              }`}
            >
              👶 Easy 👶
            </button>
            <button
              value="medium"
              className={`btn btn-ui ${
                difficulty === "medium" ? "selected" : ""
              }`}
            >
              😐 Medium 😐
            </button>
            <button
              value="hard"
              className={`btn btn-ui ${
                difficulty === "hard" ? "selected" : ""
              }`}
            >
              👿 Hard 👿
            </button>
          </div>
          {difficulty && children}
        </div>
      </div>
    </div>
  );
}

export default StartScreen;
