'use strict';
import * Filed from './field.js';
let score = 0;
let started = false;
const GAME_DURATION_SEC = 5;

export default class Game{
    constructor(){

        this.gameBtn = document.querySelector('.game__button');
        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        this.gameBtn.addEventListener('click', () =>{
            if (started) {
                stopGame();
            } else{
                startGame();
            }
        });
    }

    initGame() {
        score = 0;
        this.gameScore.innerText = carrotCount;
        gameField.init();
    }

    stopGame() {
        started = false;
        stopGameTimer();
        hideGameButton();
        gameFinishBanner.showWithText('REPLAY?')
        sound.playAlert();
        sound.stopBackground();
    }

    startGame() {
        started = true;
        initGame();
        hideGameButton();
        showStopButton();
        showTimerAndScore();
        startGameTimer();
        sound.playBackground();
    }

    startGameTimer() {
        let remainingTimeSec = GAME_DURATION_SEC;
        updateTimerText(remainingTimeSec);
        timer = setInterval(() =>{
            if (remainingTimeSec <=0) {
                clearInterval(timer);
                finishGame(carrotCount === score);
                return;
            }
            updateTimerText(--remainingTimeSec)
        },1000);
    }
    
    updateTimerText(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        gameTimer.innerHTML = `${minutes}:${seconds}`
    }
    
    
    stopGameTimer() {
        clearInterval(timer);
        hideGameButton();
        gameFinishBanner.showWithText('REPLAY?')
    }
    
    updateScoreBoard() {
        gameScore.innerText = carrotCount - score;
    }
}