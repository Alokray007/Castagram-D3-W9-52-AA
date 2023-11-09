export const createScoreContainer = () => {
    // Create score container
    const scoreContainer = document.createElement("div");
    scoreContainer.className = "score-container";
    scoreContainer.style.display = "flex";
    scoreContainer.style.flexDirection = "column";
    scoreContainer.style.alignItems = "center";

    const scoreDisplay = createScoreDisplay();
    const btnContainer = createBtnContainer();

    scoreContainer.appendChild(scoreDisplay);
    scoreContainer.appendChild(btnContainer);

    const container = document.querySelector(".container");
    container.appendChild(scoreContainer);

    // Load score from localStorage
    initScore()
};

const createScoreDisplay = () => {
    // Create score display
    const scoreDisplay = document.createElement("div");
    scoreDisplay.className = "score-display";
    scoreDisplay.style.marginBottom = "10px";

    const scoreTitle = document.createElement("span");
    scoreTitle.innerText = "Popularity Score: ";

    const score = document.createElement("span");
    score.className = "score";
    score.innerText = "0";

    scoreDisplay.appendChild(scoreTitle);
    scoreDisplay.appendChild(score);

    return scoreDisplay;
};

const createBtnContainer = () => {
    // Create upvote/downvote buttons
    const btnContainer = document.createElement("div");

    const upvoteBtn = document.createElement("button");
    upvoteBtn.id = "upvote";
    upvoteBtn.innerText = "Upvote";

    const downvoteBtn = document.createElement("button");
    downvoteBtn.id = "downvote";
    downvoteBtn.innerText = "Downvote";
    downvoteBtn.style.marginLeft = "5px";

    btnContainer.appendChild(upvoteBtn);
    btnContainer.appendChild(downvoteBtn);

    upvoteBtn.addEventListener('click', vote);
    downvoteBtn.addEventListener('click', vote);

    return btnContainer;
};

const vote = e => {
    const score = document.querySelector('.score');
    let newScore = score.innerText;
    if (e.target.id === "upvote") {
        newScore = parseInt(newScore) + 1;
    } else {
        newScore = parseInt(newScore) - 1;
    }

    // update score
    updateScore(newScore);

    // Store the new score in localStorage
    localStorage.setItem("score", newScore);
};

// Function to initialize the score display
export const initScore = () => {
    const score = localStorage.getItem("score");
    if (score !== null) {
      // If there's a score in localStorage, update the score display
      updateScore(parseInt(score));
    }
};

// Call `initScore` when the page loads
window.onload = () => {
    initScore();
};

export const resetScore = () => {
    // reset score to 0
    updateScore(0);

    // Clear the score from localStorage
    localStorage.removeItem("score");
};

const updateScore = (newScore) => {
    const score = document.querySelector('.score');
    score.innerText = newScore;
};
