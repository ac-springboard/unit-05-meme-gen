"use strict";

import {konz} from "../../constants.js";

export class MemeClass {
  static builder = function () {
    let meme   = document.createElement('div');
    let hasImg = false;
    let count  = 0;
    return {
      addImg(formUrl) {
        let img = document.createElement('img');
        img.setAttribute('src', formUrl);
        img.classList.add('meme-img');
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
        meme.append(top);
        return this;
      },
      addBtm(formBtm) {
        let btm       = document.createElement('div');
        btm.innerHTML = formBtm;
        btm.classList.add('meme-text');
        btm.classList.add('meme-btm');
        btm.style.fontSize = konz.css.memeTextFontSize;
        meme.append(btm);
        return this;
      },
      build() {
        meme.classList.add('meme-elem');
        let id = String(Math.random() * 1000);
        console.log('sid', id);
        meme.id = id;
        console.log('hasImg', hasImg);
        if (!hasImg) {
          this.addImg( Math.random() < 0.5 ? 'default.png': 'small.png');
        }
        const memeClass = new MemeClass(meme);
        return memeClass;
      }
    }
  };

  constructor(meme) {
    this.meme = meme;
  }

  getMeme() {
    return this.meme;
  }
}
