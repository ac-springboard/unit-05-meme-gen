"use strict";

import {konz} from "../../constants.js";

export class MemeClass {
  constructor(meme) {
    this.meme = meme;
  }

  getMeme() {
    return this.meme;
  }

  static builder = function () {
    // let img;
    // let top;
    // let btm;
    // let self = this;
    // let test = '';
    let meme = document.createElement('div');
    let hasImg = false;
    // let hid  = document.getElementById('hid');
    // let imgH;
    // let topH;
    // let btmH;
    let count = 0;
    return {
      addImg(formUrl) {
        let img = document.createElement('img');
        img.setAttribute('src', formUrl);
        img.classList.add('meme-img');
        // imgH = this.calcH(img);
        meme.append(img);
        hasImg = true;
        return this;
      },
      addTop(formTop) {
        let top       = document.createElement('div');
        top.innerHTML = formTop;
        top.classList.add('meme-text');
        top.classList.add('meme-top');
        top.style.fontSize = konz.css.memeTextFontSize;
        // setTimeout(this.calcH(top, 'top'), 500 );

        meme.append(top);
        return this;
      },
      addBtm(formBtm) {
        let btm       = document.createElement('div');
        btm.innerHTML = formBtm;
        btm.classList.add('meme-text');
        btm.classList.add('meme-btm');
        btm.style.fontSize = konz.css.memeTextFontSize;
        // btmH = this.calcH(btm);
        meme.append(btm);
        return this;
      },
      calcH ( elem, elemName ){
        hid.appendChild(elem);
        // const h = hid.clientHeight;
        // hid.innerHTML = '';
        console.log(elemName, h);
        return h;
      },
      build() {
        // console.log('img, top, btm', imgH, topH, btmH );
        meme.classList.add('meme-elem');
        let id = String( Math.random() * 1000 );
        console.log('sid',id);
         meme.id = id;
        console.log( 'hasImg', hasImg );
        if ( !hasImg ){
          this.addImg('small.png');
        }
        const memeClass = new MemeClass(meme);
        return memeClass;
      }
    }
  };
}
