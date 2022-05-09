import './styles/index.scss';
import keys from './data/keys.json';

import {SimpleButtons} from "./js/SimpleButtons";
import {FunctionalButtons} from "./js/FunctionalButtons";



let body = document.body;
let wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
body.append(wrapper);

let form = document.createElement('form');
wrapper.append(form);

let textarea = document.createElement('textarea');
textarea.classList.add('textarea');
form.append(textarea);

let wrapVirtualKeyboard = document.createElement("div");
wrapVirtualKeyboard.classList.add("wrap-virtual-keyboard");
wrapper.append(wrapVirtualKeyboard);

let virtualKeyboard = document.createElement('div');
virtualKeyboard.classList.add('virtual-keyboard');
wrapVirtualKeyboard.append(virtualKeyboard);

//массив кнопок по классам
let keysUp = document.querySelectorAll(".keyUp");
let keysDown = document.querySelectorAll(".keyDown");
let keysUpEng = document.querySelectorAll(".keyUpEng");
let keysDownEng = document.querySelectorAll(".keyDownEng");
let keysUpRus = document.querySelectorAll(".keyUpRus");
let keysDownRus = document.querySelectorAll(".keyDownRus");
let btnSimple = document.querySelectorAll('.simpleBtn');
let arrBtn = btnSimple.length*2;



//переключатели
let CapsLock = '0';
let Shift = '0';
let lang = 'en';

//переключение языков
//let language = document.querySelector('html').lang;
let rusLang = document.getElementsByClassName("rus");
let engLang = document.getElementsByClassName("eng");
console.log(rusLang);
console.log(engLang);


if(lang === 'en') {
   for(let i = 0; i < rusLang.length; i++ ) {
      if (!document.querySelector(".eng .hidden")) {
         engLang[i].classList.remove('hidden');
      }
      if(!!document.querySelector(".rus .hidden")) {
         rusLang[i].classList.add('hidden');
      }
   }

} else if(lang === 'ru') {
   for (let i = 0; i < engLang.length; i++) {
      if (!!document.querySelector(".eng .hidden")) {
         engLang[i].classList.add('hidden');
      }
      if (!document.querySelector(".rus .hidden")) {
         rusLang[i].classList.remove('hidden');
      }
   }
}


//TODO условия для ShiftKey и CapsLock

//добавление кнопок

function addKeys () {
   for(let i = 0; i < keys.length; i++) {
      if (keys[i]['type'] === "functional") {
         let funcBtn = (new FunctionalButtons(keys[i]['value'], keys[i]["btnName"], keys[i]["code"], keys[i]['type'])).createFuncButton();
         virtualKeyboard.append(funcBtn);
      }
      else {
         let simpleBtn = (new SimpleButtons(keys[i]['value'],keys[i]["valueShift"],keys[i]["valueRu"],keys[i]["valueShiftRu"], keys[i]["btnName"], keys[i]["code"], keys[i]['type'] )).createSimpleButton();
         virtualKeyboard.append(simpleBtn);
      }
   }
}
addKeys();


document.onkeydown = function (event) {
   console.log(event);
}


//все кнопки
let btn = document.querySelectorAll('.btn');
let flag = false;
//события клавиатуры
document.addEventListener('keydown', function(event) {
      //TODO добавить условие для родителя
   let activeBtn = document.querySelector('#'+event.code);
      activeBtn.classList.add('active');
      textarea.focus();

      if(event.shiftKey === true && flag === false) {

         //TODO прописать условия Shift
         Shift = '1';
         for(let i = 0; i < arrBtn; i++) {
            keysDown[i].classList.add('hidden');
            keysUp[i].classList.remove('hidden');
         }
      }

   if(event.code === "AltLeft") flag = true;
   if(event.code === "ShiftLeft" && flag) {

      flag = false;
      if(lang === 'en') {
         lang = 'ru';

      } else if (lang === 'ru') {
         lang = 'en';
      }

      alert(lang);
   }

      if(event.code === "CapsLock") {
//TODO условия
         if (CapsLock === "0") {

            CapsLock = "1";
         } else if(CapsLock === "1") {
            CapsLock = "0";
         }
      }
   });


document.addEventListener('keyup', function(event) {

   let activeBtn = document.querySelector('#'+event.code);
   activeBtn.classList.remove('active');

   if(event.shiftKey === false) {
      Shift = '0';
      for(let i = 0; i < arrBtn; i++) {
         keysUp[i].classList.add('hidden');
         keysDown[i].classList.remove('hidden');
      }
   }
});

//комбинации клавиш




//события мыши
document.addEventListener('mousedown', function (event) {
   let entryField = document.querySelector("textarea").value;
   let activeBtn = document.querySelector('#' + event.target.dataset.code);
   activeBtn.classList.add('active');

   //functional keys

   //BackSpace
   if (event.target.dataset.code === "Backspace") {
      //console.log(entryField);
      //console.log(event.target.dataset.code);
      let startCursor = document.querySelector("textarea").selectionStart;
      let endCursor = document.querySelector("textarea").selectionEnd;
      let textareaLeng = document.querySelector("textarea").value.length;

      //console.log(startCursor);
      //console.log(endCursor);

      if (startCursor === textareaLeng) {
         document.querySelector("textarea").value = entryField.slice(0, startCursor - 1);
      }
      //TODO сделать условие для середины
      /*
  else {
     if(startCursor !== endCursor) {
        document.querySelector("textarea").value = entryField.slice(startCursor - 1, endCursor);

        console.log(entryField);
     }
     console.log(entryField);
        entryField.slice(startCursor - 1, startCursor);
        document.querySelector("textarea").value = entryField;
        console.log(startCursor);
        console.log(endCursor);
     }
  */
   }

   //CapsLock
   if (event.target.dataset.code === "CapsLock") {

      if (CapsLock === "0") {
         CapsLock = "1";
      } else if (CapsLock === "1") {
         CapsLock = "0";
      }
   }

   //Shift
   if (event.target.dataset.code === "ShiftLeft" ||
       event.target.dataset.code === "ShiftRight") {
      console.log(event.target.dataset.code);

      for (let i = 0; i < arrBtn; i++) {
         keysDown[i].classList.add('hidden');
         keysUp[i].classList.remove('hidden');
      }
      //TODO написать условия для отпускания мыши

      if (Shift === '0') {
         Shift = '1';
      } else if (Shift === '1') {
         Shift = '0';
      }
   }

   //Space
   if (event.target.dataset.code === "Space") {
      document.querySelector("textarea").value = entryField + " ";
   }

   //Enter
   if (event.target.dataset.code === "Enter") {
      document.querySelector("textarea").value = entryField + "\n";
   }

   //Tab
   if (event.target.dataset.code === "Tab") {
      document.querySelector("textarea").value = entryField + "    ";
   }

   //Delete
//TODO написать условие для DELETE

   //letter keys
   if(event.target.dataset.type === "letter") {

      for(let i = 0; i < keys.length; i++) {
         //TODO keys[i] в переменную. добавить условие для рус языка
         if (event.target.dataset.code === keys[i]['code']) {

            if(CapsLock === '0') {
               if(Shift ==='0') {
                  document.querySelector("textarea").value = entryField + keys[i]['value'];
               } else if (Shift === '1') {
                  Shift = '0';
                  document.querySelector("textarea").value = entryField + keys[i]['valueShift'];
               }
            } else if (CapsLock === '1') {
               if(Shift === '0') {
                  document.querySelector("textarea").value = entryField + keys[i]['valueShift'];
               } else if (Shift === '1') {
                  Shift = '0';
                  document.querySelector("textarea").value = entryField + keys[i]['value'];
               }
            }
         }
      }

   }


   //number keys
   //TODO для русского языка
   if(event.target.dataset.type === "number") {
      for(let i = 0; i < keys.length; i++) {
         if (event.target.dataset.code === keys[i]['code']) {
            if (Shift === '0') {
               document.querySelector("textarea").value = entryField + keys[i]['value'];
            } else if (Shift === '1') {
               Shift = '0';
               document.querySelector("textarea").value = entryField + keys[i]['valueShift'];
            }
         }
      }
   }

});



document.addEventListener('mouseup', function (event) {
   let activeBtn = document.querySelector('.active');
   activeBtn.classList.remove('active');


   if (event.target.dataset.code === "ShiftLeft" ||
       event.target.dataset.code === "ShiftRight") {

      for (let i = 0; i < arrBtn; i++) {
         keysUp[i].classList.add('hidden');
         keysDown[i].classList.remove('hidden');
      }
   }
});




