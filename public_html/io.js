"use strict";

import {konz} from "./constants.js";

/**
 * This class observes index
 */
export class IO {

  update(data) {
    let action = data.action;
    if (action === konz.actions.meme.added) {
      this.saveList(data.memes);
    } else if (action === konz.actions.meme.removed) {
      this.saveList(data.memes);
    } else {
      // TODO: Move the message to konz
      throw new Error("Error. I didn't... etc");
    }

  }

  saveList(memes) {
    localStorage.removeItem('meme-gen-list');
    localStorage.setItem('meme-gen-list', JSON.stringify(memes));
  }

  loadList(index) {
    const item = localStorage.getItem('meme-gen-list');
    if (item !== null && item !== undefined) {
      const memes = JSON.parse(item);
      index.addLoadedMemes(memes);
    }
  }
}
