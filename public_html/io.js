"use strict";

import {konz} from "./constants.js";

/**
 * This class observes index
 */
export class IO {

  update(data) {
    console.log('io/update(data)/data', JSON.stringify(data, null, 2));
    console.log('-------------------');

    let action = data.action;
    if (action === konz.actions.meme.added) {
      console.log('io/update(data)/meme-added', 'saving list...');
      this.saveList(data.memes);
    } else if (action === konz.actions.meme.removed) {
      console.log('io/update(data)/meme-removed', 'saving list...');
      this.saveList(data.memes);
    } else {
      throw new Error("Error. I didn't... etc");
    }

  }

  saveList(memes) {
    localStorage.removeItem('meme-gen-list');
    localStorage.setItem('meme-gen-list', JSON.stringify(memes));
    console.log('List saved!');
  }

  loadList(index) {
    const item = localStorage.getItem('meme-gen-list');
    console.log('item', item, !item, !!item);
    if (item !== null && item !== undefined ) {
      console.log('loading ', item);
      const memes = JSON.parse(item);
      index.addLoadedMemes(memes);
    }
  }
}
