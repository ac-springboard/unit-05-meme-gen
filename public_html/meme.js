"use strict";

import {konz}          from "./constants.js";
import {Exhibitionist} from "./exhibitionist.js";

/**
 * This class is observed by index
 */
export class MemeBuilder extends Exhibitionist {

  static get builder() {
    const meme        = document.createElement('div');
    let hasImg        = false;
    const addRemoveBt = function () {
      let removeBt       = document.createElement('div');
      removeBt.innerText = konz.symbols.remove;
      removeBt.classList.add('meme-remove-bt');
      removeBt.addEventListener('click', () => {
        // console.log('meme', meme );
        meme.remove();
        MemeBuilder.data.action = konz.actions.meme.removed;
        MemeBuilder.self.notify(MemeBuilder.data);
      });
      meme.append(removeBt);
    };
    return {
      addImg(formUrl) {
        if (!!formUrl) {
          let img = document.createElement('img');
          img.setAttribute('src', formUrl);
          img.classList.add('meme-img');
          meme.dataset.url = formUrl;
          meme.append(img);
          hasImg = true;
        } else {
          meme.dataset.url = '';
        }
        return this;
      },
      addTop(formTop) {
        if (!!formTop) {
          let top       = document.createElement('div');
          top.innerHTML = formTop;
          top.classList.add('meme-text');
          top.classList.add('meme-top');
          top.style.fontSize    = konz.css.memeTextFontSize;
          top.style.maxFontSize = konz.css.memeTextMaxFontSize;
          meme.dataset.top      = formTop;
          meme.append(top);
        }
        return this;
      },
      addBtm(formBtm) {
        if (!!formBtm) {
          let btm       = document.createElement('div');
          btm.innerHTML = formBtm;
          btm.classList.add('meme-text');
          btm.classList.add('meme-btm');
          btm.style.fontSize    = konz.css.memeTextFontSize;
          btm.style.maxFontSize = konz.css.memeTextMaxFontSize;
          meme.dataset.btm      = formBtm;
          meme.append(btm);
        }
        return this;
      },
      build() {
        meme.classList.add('meme-elem');
        let id  = String(Math.random() * 1000);
        meme.id = id;
        if (!hasImg) {
          this.addImg('default.png');
        }
        addRemoveBt();
        return meme;
      }
    };
  }

  constructor() {
    super();
    MemeBuilder.self = this;
  }
}

/*
 I dont' like this definition much but jshint was throwing an error
 ( Class properties must be methods. Expected '(' but instead saw '='. )
 and I can't re-write this code for now.
 */

MemeBuilder.data = {
  type  : 'meme',
  action: ''
};
MemeBuilder.self=null;
