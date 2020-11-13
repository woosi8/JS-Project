'use strict';
import * as sound from './sound.js' // 캐롯 사운드 가져오기위해

// 상수인것들은 클래스 밖에 선언해준다
const CARROT_SIZE = 80;

export const ItemType = Object.freeze({
    carrot: 'carrot',
    bug: 'bug'
}) 
export class Filed{
    constructor(carrotCount, bugCount){
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect(); // 필드에 놀이구역(범위설정)
        // this바인딩 1 this.onClick = this.onClick.bind(this); // Class와 바인딩 시키기( 잘안쓰는 방법, 보통은 이벤트에 에로우 펑션을 아래처럼 해준다)
        //  this바인딩 2 this.field.addEventListener('click', (event) => this.onClick(event)); // 에로우 펑션은 this가 유지된다
        this.field.addEventListener('click', this.onClick); //자바스크립트에서는 함수를 인자로 어딘가로 전달할때 Class 정보는 함께 전달되지 않는다, this 바인딩이 필요하다
    }

    init(){
        this.field.innerHTML = ''; //버튼 시작시마다 아이콘들이 추가되지 않게 리셋
        this._addItem('carrot',this.carrotCount,'img/carrot.png');
        this._addItem('bug',this.bugCount,'img/bug.png');
    }


    setClickListener(onItemClick){
        this.onItemClick = onItemClick;
    }

    //underbar = private function
    _addItem(className, count, imgPath) {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - CARROT_SIZE;
        const y2 = this.fieldRect.height - CARROT_SIZE;
        for (let i = 0;  i < count; i++) {
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute';
            const x = randomNumber(x1, x2);
            const y = randomNumber(y1, y2);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);
        }
    }

//  this바인딩3 펑션이 인자로 받아 this가 안먹을때는 onClick(함수)을 변수로 해준다 (this바인딩)
    // onClick (event) {
    onClick = (event) => {
        const target = event.target;
        if (target.matches('.carrot')) {
            target.remove();
            sound.playCarrot();
            this.onItemClick && this.onItemClick(ItemType.carrot);
        } else if(target.matches('.bug')){
            this.onItemClick && this.onItemClick(ItemType.bug);
        }
    }
} 

// class와 상관없는 상수 static, 밖에 두는게 더 효율적이다(클래스안에서 반복안되서)


function randomNumber(min, max) {
    return Math.random() * (max - min) + min; //정해진 min,max 범위안에서 (max숫자는 미포함)
    
}



