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
    memes: []
  };

  constructor() {
    super();
  }

  update(data) {
    // console.log('Index/update(data)/data', JSON.stringify(data, null, 2));
    // console.log('-------------------');
    const type = data.type;

    if (type === 'meme') {
      if (data.action === 'meme-removed') {
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
        this.goMeme();
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

  goMeme() {
    const meme = MemeBuilder
      .builder()
      .addImg(konz.form.url.value)
      .addTop(konz.form.top.value)
      .addBtm(konz.form.btm.value)
      .build();

    konz.divs.memes.append(meme);
    konz.divs.memes.scrollTop = konz.divs.memes.scrollHeight;

    Index.data.action = konz.actions.meme.added;
    const memes       = konz.divs.memes.children;
    const memesArr    = [...memes];
    Index.data.memes = [];
    memesArr.forEach( m => {
      console.log('m', m);
      Index.data.memes.push({
                      id : m.id,
                      url: m.dataset.url,
                      top: m.dataset.top,
                      btm: m.dataset.btm
                    });
    });
    console.log('Index.data', Index.data);
    this.notify(Index.data);
  }


}
