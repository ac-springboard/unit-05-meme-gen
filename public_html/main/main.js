'use strict';

import {Form as formjs} from './index/form/form.js';
import {konz}           from "../constants.js";
import {Utils}          from "../utils.js";
import {MemeClass}      from "./factory/meme.js";
import {FormValidation} from "./index/form/form-validation.js";

konz.init();

class Main {

  static init() {
    Main.addSubmitListener();
    Main.addInputListeners();
    formjs.init();
  }

  static addSubmitListener() {
    konz.form.form
        .addEventListener('submit', (e) => {
          e.preventDefault();
          formjs.submit();
        });
  }

  static addInputListeners() {
    konz.form.inputs.forEach((inpt) => {
      let errKey;
      inpt.addEventListener('click', (e) => {
        errKey                      =
          Utils.htmlIdToJs('meme-', e.target.id) + 'Err';
        konz.form[errKey].innerText = '';
      });
      inpt.addEventListener('focusout', (e) => {
        errKey      = Utils.htmlIdToJs('meme-', e.target.id) + 'Err';
        console.log( 'errKey', errKey);
        // const valid = formjs.validateInputs();
        FormValidation.validation();
      });
    });
  }
}

Main.init();

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

export {Main}


