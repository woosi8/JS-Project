'use strict'

const items = document.querySelector('.items'),
      input = document.querySelector('.footer__input'),
      addBtn = document.querySelector('.footer__button');
      input.focus();

function onAdd() {
    // 1. 사용자가 입력한 텍스트를 받아옴
    const text = input.value;
    if (text === '') {
        input.focus();
        return;
    }
    // 2. 새로운 아이템을 만듬 (텍스트 + 삭제 버튼)
    const item = creatItem(text);
    // 3. items 컨테이너안에 새로 만든 아이템을 추가한다.
    items.appendChild(item);
    // 4. 새로 추가된 아이템으로 스크롤링 최신화
    item.scrollIntoView({block:'center'});
    // 5. 인풋을 초기화 한다.
    input.value = '';
    input.focus();

}

let id = 0; /// 인티져로 해주는건 안좋다. 여기선 간단히 하기위해서 : UUID (유니크아이디)로 하는게 좋다. 아니면 오브젝트 해시코드이용

function creatItem(text) {
    // item__row를 똑같이 구현해준다
    const itemRow = document.createElement('li');
    itemRow.setAttribute('class','item__row');
    // String으로 해주기
    itemRow.innerHTML = `
    <div class="item" data-id=${id}>
         <span class="item__name">${text}</span>
         <button class="item__delete" data-id=${id}>
             <i class="fas fa-trash-alt"></i>
         </button>
    </div>
    <div class="itme__divier"></div>
    `
    id++
    return itemRow;
}

addBtn.addEventListener('click', () =>{
    onAdd();
})

input.addEventListener('keypress',(event) =>{
    if (event.keyCode == 13) {
         onAdd();
    }


})