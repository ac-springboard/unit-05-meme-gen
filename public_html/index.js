"use strict";

/*
 This class is supposed to provide integration with the index.html file.
 */

import {MemeBuilder}   from './meme.js';
import {konz}          from './constants.js';
import {Utils}         from "./utils.js";
import {Exhibitionist} from "./exhibitionist.js";

// TODO: Fix the files' and classes's names

/**
 * This class observes form
 * This class is observed by ion
 */
export class Index extends Exhibitionist {

  constructor() {
    super();
  }

  update(data) {
    const type = data.type;

    if (type === 'meme') {
      if (data.action === konz.actions.meme.removed) {
        data.memes = this.getMemesJsonArr();
        this.notify(data);
        return;
      } else {
        // TODO: Move message to konz
        throw new Error("Error. I don't understand the action '" + data.action +
                        "' from meme.js");
      }
    }

    const valid        = data.isValid();
    const isSubmission = type === 'submission';
    const isValidation = type === 'validation';
    this.validationMsgs(data);
    if (isSubmission) {
      if (valid) {
        // TODO: Front-end message instead of console.log('Valid submission.',
        // 'Moving forward.');
        this.addMemeFromForm();
      } else {
        // TODO: Front-end message instead of console.log('Invalid
        // submission.', 'Please, review the form data.');
      }
    } else if (isValidation) {

      if (valid) {
        // TODO: Front-end message instead of console.log('Valid data.',
        // 'Submit?');
      } else {
        // console.log('Invalid data.', 'Back to form...');
      }
    } else {
      throw new Error(// TODO: Move message to konz
                      "Error. Neither Validation nor Submission from 'form-js'");
    }
  }

  validationMsgs(data) {
    let errKey;
    let errors;
    let strErr;
    konz.names.forEach(name => {
      errKey = name + 'Err';
      errors = data[name].err;
      strErr = '';
      errors.forEach(err => {
        strErr += konz.err[err] + '<br>';
      });
      konz.form[errKey].innerHTML = strErr;
    });
  }

  onInputClick(e) {
    const key                        = Utils.htmlIdToJs('meme-', e.target.id);
    konz.form[key + 'Err'].innerHTML = '';
  }

  buildMeme(url, top, btm, id) {
    return MemeBuilder
      .builder()
      .addImg(url)
      .addTop(top)
      .addBtm(btm)
      .build(id);
  }

  updateIndexData() {
    Index.data.action = konz.actions.meme.added;
    Index.data.memes  = this.getMemesJsonArr();
    this.notify(Index.data);
  }

  getMemesJsonArr() {
    const jsonArr  = [];
    const memesArr = [...konz.divs.memes.children];
    memesArr.forEach(m => {
      jsonArr.push({
                     id : m.id,
                     url: m.dataset.url,
                     top: m.dataset.top,
                     btm: m.dataset.btm
                   });
    });
    return jsonArr;
  }

  addMemeFromForm() {
    const meme = this.buildMeme(konz.form.url.value, konz.form.top.value,
                                konz.form.btm.value);
    this.appendMeme(meme);
    this.updateIndexData();
  }

  appendMeme(meme) {
    konz.divs.memes.append(meme);
    konz.divs.memes.scrollTop = konz.divs.memes.scrollHeight;
  }

  addLoadedMemes(loadedMemes) {
    let meme;
    loadedMemes.forEach(loadedMeme => {
      meme =
        this.buildMeme(loadedMeme.url, loadedMeme.top, loadedMeme.btm,
                       loadedMeme.id);
      this.appendMeme(meme);
    });
  }
}

Index.data = {
  type  : 'index',
  action: '',
  memes : []
};

