'use strict'

// play__ground
const bug = document.querySelector('.bugs');
const carrot = document.querySelector('.carrots');

// timer
const pause = document.querySelector('.pause__box');
const time = document.querySelector('.timer');
const counter = document.querySelector('.count');

const myTest = new Array('carrot','bug'); // 뉴어레이에 

function randomItem(a){
    
  return a[Math.floor(Math.random()*a.length)]
}


let 그릇 = randomItem(myTest);
let 후보군 = Array(10).fill().map(function (그릇, 인덱스) { //맵으로 string 매칭 가능한지
    return 그릇;
})

console.log(후보군)
console.log(randomItem(myTest))
console.log(randomItem(myTest))