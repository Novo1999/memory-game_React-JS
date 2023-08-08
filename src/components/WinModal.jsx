function WinModal({ winStatus, score, highscore, dispatch }) {
  function handleModalButtons(e) {
    if (!e.target.value) return;
    dispatch({ type: "restart", payload: e.target.value });
  }
  return (
    <div className="win-modal-section">
      <div className="win-modal">
        <h1>{winStatus ? "You Win" : "You Lose"}</h1>
        <p id="modal-score">Your Score: {score} </p>
        <p id="modal-score">HighScore: {highscore} </p>
        <p>Play Again</p>
        <div onClick={(e) => handleModalButtons(e)} className="modal-btn">
          <button value="easy" className="btn btn-modal">
            Easy
          </button>
          <button value="medium" className="btn btn-modal">
            Medium
          </button>
          <button value="hard" className="btn btn-modal">
            Hard
          </button>
        </div>
      </div>
    </div>
  );
}

export default WinModal;
