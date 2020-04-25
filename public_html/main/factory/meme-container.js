"use strict";

import {konz} from "../../constants.js";

export class MemeContainerClass {
  constructor(memeContainer) {
    this.memeContainer = memeContainer;
  }

  getMemeContainer() {
    return this.memeContainer;
  }

  static builder = function () {
    let removeBt;
    let memeContainer = document.createElement('div');
    return {
      addRemoveBt() {
        removeBt           = document.createElement('div');
        removeBt.innerText = konz.symbols.remove;
        removeBt.classList.add('meme-container-remove-bt');
        removeBt.addEventListener('click', () => {
          memeContainer.remove();
        });
        // memeContainer.append(removeBt);
        return this;
      },
      build() {
        memeContainer.classList.add('meme-container');
        const memeContainerClass = new MemeContainerClass(memeContainer);
        return memeContainerClass;
      }
    }
  };
}
