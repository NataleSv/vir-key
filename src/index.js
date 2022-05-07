import './styles/index.scss';
import engLang from '../src/data/eng.json';
import ruLang from '../src/data/ru.json';
import {SimpleButtons} from "./js/SimpleButtons";



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


//переключение языков
let language = document.querySelector('html').lang;

if(language === 'en') {
   lang(engLang,"value");
} else if(language === 'ru') {
   lang(ruLang, "value");
}

//добавление кнопок

function lang (lang, value) {
   for(let i = 0; i < lang.length; i++) {
      let btn = (new SimpleButtons(lang[i][value], lang[i]["btnName"], lang[i]["code"] )).createButton();
      virtualKeyboard.append(btn);
   }
}

// вывод value кнопок


document.onkeydown = function (event) {
   console.log(event);
}

let btn = document.querySelectorAll('.btn');

document.addEventListener('keydown', function(event) {
   let activeBtn = document.querySelector('#'+event.code);
   activeBtn.classList.add('active');
   textarea.focus();
   if(event.shiftKey === true) {
            for (let i = 0; i < btn.length; i++) {
               for (let j = 0; j < engLang.length; j++) {
                  if (btn[i].id === engLang[j]['code']) {
                     btn[i].innerHTML = engLang[j]['valueShift'];
                  }
               }
         }
      }
});

document.onkeyup = function (event) {
   console.log(event);
}
document.addEventListener('keyup', function(event) {

   let activeBtn = document.querySelector('.active');
   activeBtn.classList.remove('active');

   if(event.shiftKey === false) {
      for (let i = 0; i < btn.length; i++) {
         for (let j = 0; j < engLang.length; j++) {
            if (btn[i].id === engLang[j]['code']) {
               btn[i].innerHTML = engLang[j]['value'];
            }
         }
      }
   }

});


//события мыши



















