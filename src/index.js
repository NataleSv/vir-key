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
   lang(engLang);
} else if(language === 'ru') {
   lang(ruLang);
}

//добавление кнопок

function lang (lang) {
   for(let i = 0; i < lang.length; i++) {
      let btn = (new SimpleButtons(lang[i]["value"], lang[i]["valueShift"], lang[i]["btnName"])).createButton();
      virtualKeyboard.append(btn);
   }
}

// вывод value кнопок























