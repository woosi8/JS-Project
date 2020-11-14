'use strict';
import { Filed, ItemType } from './field.js'
import * as sound from './sound.js' // sound이름 전부다

// const GAME_DURATION_SEC = 5;


// 타입 보장해주기 (문자열을 전달하는게 아닌 타입을 전달하도록)
export const Reason = Object.freeze({ //문자열을 쓰지 못하게 만들기 (지정된 object의 키값들만 쓸수있도록)
    win: 'win',
    lose: 'lose',
    cancel: 'cancel',
})


// Builder Pattern
export class GameBuilder {
    withgameDuration(duration) {
        this.gameDuration = duration;
        return this;
    }

    withcarrotCount(num) {
        this.carrotCount = num;
        return this;
    }
    withbugCount(num) {
        this.bugCount = num;
        return this;
    }

    build() {
        return new Game(
            this.gameDuration, //
            this.carrotCount,
            this.bugCount
        )
    }
}

// 이건 숨긴다
class Game {
    constructor(gameDuration, carrotCount, bugCount) {
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        this.gameBtn = document.querySelector('.game__button');
        this.gameBtn.addEventListener('click', () => {
            if (this.started) {
                this.stop(Reason.cancel);
            } else {
                this.start();
            }
        });
        this.gameField = new Filed(carrotCount, bugCount);
        this.gameField.setClickListener(this.onItemClick);
        this.started = false;
        this.score = 0;
        this.timer = undefined;
    }

    // 게임이 끝나면 알려주는 콜백 받아오기 (new)
    setGamestopListener(onGameStop) {
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

    stop(reason) {
        this.started = false;
        this.stopGameTimer();
        this.hideGameButton();
        // this.gameFinishBanner.showWithText('REPLAY?')
        sound.stopBackground();
        this.onGameStop && this.onGameStop(reason);
    }

    onItemClick = (item) => {
        if (!this.started) {
            return;
        }
        if (item === ItemType.carrot) {
            this.score++;
            this.updateScoreBoard();
            if (this.score === this.carrotCount) {
                this.stop(Reason.win);
            }
        } else if (item === ItemType.bug) {
            this.stop(Reason.lose);
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
        this.timer = setInterval(() => {
            if (remainingTimeSec <= 0) {
                clearInterval(this.timer);
                this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose);
                return;
            }
            this.updateTimerText(--remainingTimeSec)
        }, 1000);
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