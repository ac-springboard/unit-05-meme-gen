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
    let top;
    let btm;
    let meme = document.createElement('div');
    return {
      addTop(formTop) {
        top           = document.createElement('div');
        top.innerText = formTop;
        top.classList.add('meme-text');
        top.style.fontSize = konz.css.memeTextFontSize;
        meme.append(top);
        return this;
      },
      addBtm(formBtm) {
        btm           = document.createElement('div');
        btm.innerText = formBtm;
        btm.classList.add('meme-text');
        btm.style.fontSize = konz.css.memeTextFontSize;
        meme.append(btm);
        return this;
      },
      build() {
        meme.classList.add('meme-elem');
        const memeClass = new MemeClass(meme);
        return memeClass;
      }
    }
  };
}
