// VARIABLES - DECLARATIONS ------------------------------
const userBoard = document.getElementById('user-board');
const machineBoard = document.getElementById('machine-board');
const resultBoard = document.getElementById('result-board');
const userScore = document.querySelector('.user-score');
const machineScore = document.querySelector('.machine-score');

const paperButton = document.getElementById('paper'); // 0
const scissorsButton = document.getElementById('scissors'); // 1
const rockButton = document.getElementById('rock'); // 2
const resetButton = document.getElementById('reset');

// FUNCTIONS - DECLARATIONS --------------------------------------------------
/**
 * Receives a Div HTML Element and sets its innerHTML value to string passed as the choice parameter.
 * @param {HTMLDivElement} board 
 * @param {string} choice 
 * @returns {void}
 */
const setBoardText = (board, choice) => board.innerHTML = choice;

/**
 * Iterates through all the boards of the game to reset their innerHTML
 * @returns
 */
const resetBoards = () => [machineBoard, userBoard, resultBoard].forEach((board) => setBoardText(board, ''));

const resetAnimations = () => {
    machineBoard.style.animation = '';
};

const setAnimations = () => {
    const fadeInAnimation = `fadeIn ${standardAnimationTime.seconds}s linear`;
    
    machineBoard.style.animation = fadeInAnimation;
    resultBoard.firstChild.style.animation = fadeInAnimation;

    setTimeout(() => resetAnimations(), standardAnimationTime.milliseconds * 1.1);
}

resetButton.onclick = () => {
    resetAnimations();
    resetBoards();
    setBoardText(userScore, 0);
    setBoardText(machineScore, 0);
}

const setButtonAction = (button, index) => button.onclick = () => {
    const currentUserChoice = choices[index]; 
    const machineChoice = choices[generateMachineChoice()];
    const hasUserWon = compareResults(currentUserChoice.id, machineChoice.id);
    const currentUserScore = Number(userScore.innerHTML);
    const currentMachineScore = Number(machineScore.innerHTML);
   
    const isTie = hasUserWon === undefined;
    const resultUserData = !isTie && hasUserWon ? userScore : machineScore;
    const resultMachineData = !isTie && hasUserWon ? currentUserScore + 1 : currentMachineScore + 1;
    if (!isTie) setBoardText(resultUserData, resultMachineData);

    const resultMessage = isTie ? actions.tie.message : actions[hasUserWon ? results.win : results.lose].message;
    const childResultBoardElement = `<div class="result-container"><span>${resultMessage}</span></div>`;
    const resultColor = actions[hasUserWon ? results.win : results.lose].color;
    setBoardText(userBoard, currentUserChoice.img);
    setBoardText(machineBoard, machineChoice.img);
    setBoardText(resultBoard, childResultBoardElement);
    resultBoard.style = `backgroundColor: '${resultColor}'`;
    
    setAnimations();
};

const initializeGame = () => [paperButton, scissorsButton, rockButton].forEach(setButtonAction);

const generateMachineChoice = () => Math.floor(Math.random() * choices.length);

const compareResults = (userChoiceIndex, machineChoiceIndex) => {
    const choiceMirrorFactor = 2;
    if (userChoiceIndex === machineChoiceIndex) return;
    
    const isUserIndexBigger = machineChoiceIndex < userChoiceIndex; 
    const minorCornerCase = machineChoiceIndex + choiceMirrorFactor !== userChoiceIndex; 
    const majorCornerCase = machineChoiceIndex - choiceMirrorFactor === userChoiceIndex;

    return isUserIndexBigger ? minorCornerCase : majorCornerCase;
};

const storedUserName = localStorage.getItem('username');
const displayUserName = document.getElementById('display-user');
displayUserName.textContent = storedUserName;

// PROGRAM ------------------------------------------------
initializeGame();