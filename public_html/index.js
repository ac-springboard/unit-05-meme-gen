"use strict";

/*
 This class is supposed to provide integration with the index.html file.
 */

import {MemeBuilder}   from './meme.js';
import {konz}          from './constants.js';
import {Utils}         from "./utils.js";
import {Exhibitionist} from "./exhibitionist.js";

/**
 * This class observes form
 * This class is observed by io
 */
export class Index extends Exhibitionist {

  static data = {
    type  : 'index',
    action: '',
    memes : []
  };

  constructor() {
    super();
  }

  update(data) {
    // console.log('Index/update(data)/data', JSON.stringify(data, null, 2));
    // console.log('-------------------');
    const type = data.type;

    if (type === 'meme') {
      if (data.action === konz.actions.meme.removed) {
        data.memes = this.getMemesJsonArr();
        this.notify(data);
        return;
      } else {
        throw new Error("Error. I don't understand the action '" + data.action +
                        "' from meme.js");
      }
    }

    const valid        = data.isValid();
    // console.log('VALID', valid );
    const isSubmission = type === 'submission';
    const isValidation = type === 'validation';
    this.validationMsgs(data);
    if (isSubmission) {
      if (valid) {
        // console.log('Valid submission.', 'Moving forward.');
        this.addMemeFromForm();
      } else {
        // console.log('Invalid submission.', 'Please, review the form data.');
      }
    } else if (isValidation) {

      if (valid) {
        // console.log('Valid data.', 'Submit?');
      } else {
        // console.log('Invalid data.', 'Back to form...');
      }
    } else {
      throw new Error(
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

    Index.data.memes = this.getMemesJsonArr();

    // const memes       = konz.divs.memes.children;
    // const memesArr    = [...memes];
    // Index.data.memes  = [];
    // memesArr.forEach(m => {
    //   console.log('m', m);
    //   Index.data.memes.push({
    //                           id : m.id,
    //                           url: m.dataset.url,
    //                           top: m.dataset.top,
    //                           btm: m.dataset.btm
    //                         });
    // });
    console.log('Index.data', Index.data);
    this.notify(Index.data);
  }

  getMemesJsonArr(){
    const jsonArr = [];
    const memesArr = [ ...konz.divs.memes.children];
    memesArr.forEach( m => {
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
    console.log('loadedMemes', loadedMemes);
    let meme;
    loadedMemes.forEach(loadedMeme => {
      meme =
        this.buildMeme(loadedMeme.url, loadedMeme.top, loadedMeme.btm,
                       loadedMeme.id);
      this.appendMeme(meme);
    });
  }

}
