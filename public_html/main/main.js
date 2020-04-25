'use strict';

import {Form as formjs} from './index/form/form.js';
import {konz}           from "../constants.js";
import {Utils}          from "../utils.js";
import {MemeClass}      from "./factory/meme.js";

konz.init();

class Main {

  static init() {
    Main.addSubmitListener();
    Main.addInputListeners();
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

const meme1 = MemeClass
  .builder()
  .addTop('Top top top')
  .addBtm('Btm btm btm')
  .build().getMeme();
memes_div.append(meme1);

const meme2 = MemeClass
  .builder()
  .addBtm('******btm2******')
  .build().getMeme();
memes_div.append(meme2);

// console.log('meme', meme);

// const covid = new Promise( (accept, reject) => {


// const memeContainer = document.createElement('div');
// const imgElem       = document.createElement('img');
// const memeTop       = document.createElement('div');

// imgElem.setAttribute('src',
//                      'https://images.newscientist.com/wp-content/uploads/2020/02/11165812/c0481846-wuhan_novel_coronavirus_illustration-spl.jpg');
// imgElem.classList.add('test'); memeTop.classList.add('top');
// memeTop.innerText = "This is the top of this fantastic meme.";
// memeContainer.appendChild(imgElem); memeContainer.appendChild(memeTop);

// memeContainer.appendChild(me);
// memeContainer.classList.add('container');


//   if (accept ){
//     console.log( 'accepted!!!');
//     // console.log( imgElem, memes_div, imgElem.width );
//     return imgElem;
//   }
//   if ( reject ){
//     console.log( 'REJECT: ', reject );
//     return undefined;
//   }
// } );

// Promise.resolve(covid).then( imgElem => {
//     console.log( imgElem );
// });
// Promise.resolve( covid );

export {Main}


