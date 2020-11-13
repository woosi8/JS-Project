'use strict'
// import PopUp from './field.js'
// import * as sound from './sound.js' // sound이름 전부다
import PopUp from './popup.js';
// import Game from './game.js';
import {GameBuilder, Reason} from './game.js';
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

// 당근, 벅스 랜덤 생성

const gameFinishBanner = new PopUp();
// gameFinishBanner.setClickListener(startGame);

// object를 간편하고 알기 쉽게 하기 위해 개선한 방법임
const game = new GameBuilder() 
.withgameDuration(5)
.withcarrotCount(carrotCount)
.withbugCount(bugCount)
.build();




// const game = new Game(5,carrotCount,bugCount);
game.setGamestopListener((reason) =>{
    let message;
    switch(reason){
        case Reason.cancle :
            message = 'Replay?'
            sound.playAlert();
            break;
        case Reason.win:
            message = 'You Won?'
            sound.playWin();
            break;
        case Reason.lose:
            message = 'You Lost?'
            sound.playBug();
            break;
        default :
            throw new Error('not valid reason');
    }
    gameFinishBanner.showWithText(message);
})

gameFinishBanner.setClickListener(() =>{
    game.start();
})












