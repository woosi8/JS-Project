'use strict'

// play__ground
const bug = document.querySelector('.bugs');
const carrot = document.querySelector('.carrots');

// timer
const pause = document.querySelector('.pause__box');
const timeElem = document.querySelector('.timer');
const counterElem = document.querySelector('.count');

// result
const homeBtn = document.querySelectorAll('.home__contact')
const modal = document.querySelector('.modal')
const overlay = document.querySelectorAll('.modal__overlay')
const closeBtn = document.querySelectorAll('.closeBtn')

const openModal = () => {
    document.querySelector('.modal').classList.add('hidden')
}
const closeModal = (event) => {
    event.currentTarget.parentNode.classList.remove('hidden')
}
overlay.forEach((event) => {
    event.addEventListener('click', closeModal)
})
closeBtn.forEach((event) => {
    event.addEventListener('click', closeModal)
})
bug.addEventListener('click', openModal);


// timer
let count = 3;
let counter =setInterval(timer, 1000); 
function timer(){
  count=count-1;
  if (count <= 0)
  {
     clearInterval(counter);
    //  modal.classList.add('hidden')
    // return
    count = 0
    } 

 timeElem.innerHTML= " 00:" + count ; // watch for spelling
}
    
timer();
    

//carrot
const countDown = () => {
    document.querySelector('.modal').classList.add('hidden')
}
carrot.addEventListener('click', countDown);







