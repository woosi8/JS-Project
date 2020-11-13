'use strict'
// import PopUp from './field.js'
import PopUp from './popup.js'
import Filed from './field.js'
import Game from './game.js'
import * as sound from './sound.js' // sound이름 전부다






const pickElem = function randomNum (lower, upper) {
    for(var i=0; i<1; i++) {
    let myRandom = Math.floor(Math.random() * (upper - lower + 1)) + lower;
    console.log(myRandom);
    return myRandom;
        }
    };
    
const carrotCount = pickElem (5, 10);
const bugCount = pickElem (9, 10);
let timer = undefined;
// 당근, 벅스 랜덤 생성

const gameFinishBanner = new PopUp();
// gameFinishBanner.setClickListener(startGame);
gameFinishBanner.setClickListener(() =>{
    startGame();
})

const gameField = new Filed(carrotCount,bugCount);
gameField.setClickListener(onItemClick);

function onItemClick(item) {
    if (!started) {
        return;
    }
    if (item ==='carrot') {
        score++;
        updateScoreBoard();
        if (score === carrotCount) {
            finishGame(true);
        }
    } else if ( item === 'bug') {
        finishGame(false);
    }

}









// 스코어 

gameBtn.addEventListener('click', () =>{
    if (started) {
        stopGame();
    } else{
        startGame();
    }
});






function startGame() {
    started = true;
    initGame();
    hideGameButton();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    sound.playBackground();
}
function stopGame() {
    started = false;
    stopGameTimer();
    hideGameButton();
    gameFinishBanner.showWithText('REPLAY?')
    sound.playAlert();
    sound.stopBackground();
}

function finishGame(win) {
    started = false;
    hideGameButton();
    stopGameTimer();
    if (win) {
        sound.playWin();
    } else{
        sound.playBug();
    }
    stopGameTimer();
    sound.stopBackground();
    gameFinishBanner.showWithText(win? 'You Won' : 'You Lost')
    
}



function showStopButton() {
    const icon = gameBtn.querySelector('.fas')
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    gameBtn.style.visibility = 'visible';

}

function hideGameButton() {
    gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
    
}





