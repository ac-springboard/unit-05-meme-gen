'use strict';

import {Form}           from './form.js';
import {konz}           from "./constants.js";
import {Utils}          from "./utils.js";
import {MemeClass}      from "./meme.js";
import {FormValidation} from "./form-validation.js";

konz.init();

// class Main {
//
//   constructor() {
//     this.addSubmitListener();
//     this.addInputListeners();
// formjs.init();
// }

const form = new Form();
const validation = new FormValidation( form );
// validation.addVoyeur(form);

(function () {
  konz.form.form
      .addEventListener('submit', (e) => {
        e.preventDefault();
        validation.onSubmit();
      });
})();

(function () {
  konz.form.inputs.forEach((inputElem) => {
    inputElem.addEventListener('click', (e) => {
      validation.onInputClick(e);
    });
    inputElem.addEventListener('focusout', (e) => {
      validation.onInputFocusOut(e);
    });
  });
})();
// }



// Main.init();

// For testing purposes
if (false) {

  console.log('B');
  let imgurl = 'https://thumbs.dreamstime.com/b/funny-business-meeting-boss-skeletons-funny-business-meeting-boss-skeletons-179075287.jpg';
  fetch(imgurl).then(res => console.log(res));


  const memes_div = document.querySelector('#memes-div');

  const meme1 = function () {
    return MemeClass
      .builder()
      .addImg(
        'https://thumbs.dreamstime.com/b/funny-monkey-face-maranhao-brasil-30428227.jpg')
      .addTop('Top top top bla bla bla bla bla bleh bleh bleh')
      .addBtm('Btm btm btm').build().getMeme();
  };
  const meme2 = function () {
    return MemeClass
      .builder()
      .addTop(String(new Date().getTime()))
      .addBtm(
        '******btm2****** but why not? I mean, why this thing doesn\'t work???')
      .build().getMeme();
  };

  let intId = setInterval(function () {
    memes_div.append(Math.random() < 0.5 ? meme1() : meme2());
    memes_div.scrollTop = memes_div.scrollHeight;
  }, 2000);
  setTimeout(function () {
    clearInterval(intId);
  }, 10000);
}

// export {Main as main}


