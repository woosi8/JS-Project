'use strict'

// play__ground
const bug = document.querySelectorAll('.bugs');
const carrot = document.querySelectorAll('.carrots');

// timer
const pause = document.querySelector('.pause__box');
const timeElem = document.querySelector('.timer');
const counterElem = document.querySelector('.count');

// result
const homeBtn = document.querySelectorAll('.home__contact')
const modal = document.querySelector('.modal')
const modalContent = document.querySelector('.modal__content')
const overlay = document.querySelectorAll('.modal__overlay')
const closeBtn = document.querySelectorAll('.closeBtn')
const resultElem = document.querySelector('.result');
const lostElem = document.createElement('div')
lostElem.className = 'lost'
lostElem.innerHTML =`you lost`
const winElem = document.createElement('div')
winElem.className = 'win'
winElem.innerHTML =`you win`
const openModal = (event) => {
    document.querySelector('.modal').classList.add('hidden')
    document.querySelector('.modal__content').appendChild(lostElem)
    document.querySelector('.modal__content').removeChild(winElem)

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
bug.forEach( bugs => {
    bugs.addEventListener('click', openModal);
});

// timer
let count = 3;
let counter =setInterval(timer, 1000); 
function timer(){
  count = count-1;
  if (count <= 0)
  {
     clearInterval(counter);
    //  modal.classList.add('hidden')
    // return
    count = 0
    } 

//  timeElem.innerHTML= " 00:" + count ; // watch for spelling
 timeElem.innerHTML= `00:${count}` // watch for spelling
}
    
timer();
    

//carrot
let numbers = 0;
const countDown = (event) => {
    if (numbers == 3) {
        document.querySelector('.modal').classList.add('hidden');
        document.querySelector('.modal__content').appendChild(winElem)
        document.querySelector('.modal__content').removeChild(lostElem)

    }
    event.target.parentNode.removeChild(event.target);
    // numbers+= 1;
    numbers++;
    counterElem.innerHTML = `${numbers}`

}
carrot.forEach(carrots =>{
    carrots.addEventListener('click', countDown);
})







