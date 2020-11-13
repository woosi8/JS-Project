'use strict';
import * as sound from './sound.js' // sound이름 전부다
import Filed from './field.js'
// const GAME_DURATION_SEC = 5;


// 타입 보장해주기
export const Reason = Object.freeze({ //문자열을 쓰지 못하게 만들기 (지정된 object의 키값들만 쓸수있도록)
    win:'win',
    lose:'lose',
    cancel:'cancel',
})


// Builder Pattern
export class GameBuilder{
    gameDuration(duration){
        this.gameDuration = duration;
        return this;
    }

    carrotCount(num) {
        this.carrotCount = num;
        return this;
    }
    bugCount(num) {
        this.bugCount = num;
        return this;
    }

    build(){
        return new Game(
            this.gameDuration, //
            this.carrotCount,
            this.bugCount
        )
    }
}

// 이건 숨긴다
class Game{
    constructor(gameDuration, carrotCount, bugCount){
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        this.gameBtn = document.querySelector('.game__button');
        this.gameBtn.addEventListener('click', () =>{
            if (this.started) {
                this.stop();
            } else{
                this.start();
            }
        });
        this.gameField = new Filed(carrotCount,bugCount);
        this.gameField.setClickListener(this.onItemClick);
        this.started = false;
        this.score = 0;
        this.timer = undefined;
    }

    // 게임이 끝나면 알려주는 콜백 받아오기 (new)
    setGamestopListener(onGameStop){
        this.onGameStop = onGameStop;
    }


    start() {
        this.started = true;
        this.initGame();
        this.hideGameButton();
        this.showStopButton();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBackground();
    }

    stop() {
        this.started = false;
        this.stopGameTimer();
        this.hideGameButton();
        // this.gameFinishBanner.showWithText('REPLAY?')
        sound.playAlert();
        sound.stopBackground();
        this.onGameStop && this.onGameStop(Reason.cancel);
    }

     finish(win) {
        this.started = false;
        this.hideGameButton();
        this.stopGameTimer();
        if (win) {
            sound.playWin();
        } else{
            sound.playBug();
        }
        this.stopGameTimer();
        sound.stopBackground();
        this.onGameStop && this.onGameStop(win ? Reason.win : Reason.lose);
        
    }

    onItemClick = (item) => {
        if (!this.started) {
            return;
        }
        if (item ==='carrot') {
            this.score++;
            this.updateScoreBoard();
            if (this.score === this.carrotCount) {
                this.finish(true);
            }
        } else if ( item === 'bug') {
            this.finish(false);
        }
    
    }




    showStopButton() {
        const icon = this.gameBtn.querySelector('.fas')
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.gameBtn.style.visibility = 'visible';
    }
    
    hideGameButton() {
        this.gameBtn.style.visibility = 'hidden';
    }

    
    
    showTimerAndScore() {
        this.gameTimer.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
        
    }
    
    startGameTimer() {
        let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec);
        this.timer = setInterval(() =>{
            if (remainingTimeSec <=0) {
                clearInterval(this.timer);
                this.finish(this.carrotCount === this.score);
                return;
            }
            this.updateTimerText(--remainingTimeSec)
        },1000);
    }
    
    stopGameTimer() {
        clearInterval(this.timer);
        // hideGameButton();
        // gameFinishBanner.showWithText('REPLAY?')
    }

    updateTimerText(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.gameTimer.innerHTML = `${minutes}:${seconds}`
    }
    
    initGame() {
        this.score = 0;
        this.gameScore.innerText = this.carrotCount;
        this.gameField.init();
    }
    
    updateScoreBoard() {
        this.gameScore.innerText = this.carrotCount - this.score;
    }

}