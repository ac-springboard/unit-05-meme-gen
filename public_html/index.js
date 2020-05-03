"use strict";

/*
 This class is supposed to provide integration with the index.html file.
 */

import {MemeBuilder} from './meme.js';
import {konz}        from './constants.js';
import {Utils}       from "./utils.js";

export class Index {

  constructor() {
  }

  update(data) {
    console.log('Index/update(data)/data', JSON.stringify(data, null, 2));
    console.log('-------------------');
    const valid        = data.isValid();
    console.log('VALID', valid );
    const isSubmission = data.type === 'submission';
    const isValidation = data.type === 'validation';
    this.validationMsgs(data);
    if (isSubmission) {
      if (valid) {
        console.log('Valid submission.', 'Moving forward.');
        this.goMeme();
      } else {
        console.log('Invalid submission.', 'Please, review the form data.');
      }
    } else if (isValidation) {

      if (valid) {
        console.log('Valid data.', 'Submit?');
      } else {
        console.log('Invalid data.', 'Back to form...');
      }
    } else {
      throw new Error('Neither Validation nor Submission. I\'m confused...');
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
  }


}
