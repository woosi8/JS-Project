'use strict'

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect(); // 필드에 놀이구역(범위설정)
const CARROT_SIZE = 80;
const pickElem = function randomNum (lower, upper) {
    for(var i=0; i<1; i++) {
    let myRandom = Math.floor(Math.random() * (upper - lower + 1)) + lower;
    console.log(myRandom);
    return myRandom;
        }
    };
const carrotCount = pickElem (5, 10);
const bugCount = pickElem (9, 10);


function initGame() {
    console.log(fieldRect);
    addItem('carrot',carrotCount,'img/carrot.png');
    addItem('bug',bugCount,'img/bug.png');
}
function addItem(className, count, imgPath) {
    console.log(count);
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;
    for (let i = 0;  i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min; //정해진 min,max 범위안에서 (max숫자는 미포함)
    
}
initGame();