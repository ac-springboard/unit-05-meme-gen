'use strict';

import {Form as formjs} from './index/form/form.js';
import {konz}           from "../constants.js";
import {Utils}          from "../utils.js";
import {MemeClass}      from "./factory/meme.js";
import {MemeContainerClass}      from "./factory/meme-container.js";

konz.init();

class Main {

  static init() {
    //
    Main.addSubmitListener();
    Main.addInputListeners();
    //
    // Main.cssInit();
  }

  // static cssInit(){
  //   let texts = document.getElementsByClassName('meme-text');
  //   console.log( 'texts', texts );
  //   texts.forEach( (t) => {
  //     console.log( 't', t );
  //     t.style.fontSize = konz.css.memeTextFontSize;
  //   });
  // }
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
        errKey = Utils.htmlIdToJs('meme-', e.target.id) + 'Err';
        const valid = formjs.validateInputs();
        if ( valid ){
          
        }
      });
    });
  }
}

Main.init();
const memes_div = document.querySelector('#memes-div');

const meme1 = function() {
  return MemeClass
    .builder()
    .addImg('https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325132/a-depiction-of-a-bacteriophage.jpg')
    .addTop('Top top top bla bla bla bla bla bleh bleh bleh')
    .addBtm('Btm btm btm')
    .build().getMeme();
}

// const memeContainer1 = MemeContainerClass
//   .builder()
//   .addRemoveBt()
//   .build()
//   .getMemeContainer();
// memeContainer1.append(meme1);

// memes_div.append(meme1);

const meme2 = function() {

  return MemeClass
    .builder()
    .addTop(String(new Date().getTime()))
    .addBtm('******btm2****** but why not? I mean, why this thing doesn\'t work???')
    .build().getMeme();
}

for ( let i = 0; i < 10 ; i++){
  memes_div.append( Math.random() < 0.5 ? meme1() : meme2() );
}

export {Main}


