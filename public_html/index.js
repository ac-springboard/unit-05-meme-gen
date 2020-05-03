"use strict";

/*
 This class is supposed to provide integration with the index.html file.
 */

import {MemeBuilder} from './meme.js';
import {konz}        from './constants.js';

export class Index {

  constructor() {
  }

  update(data) {
    // console.log('Index/update(data)/data', JSON.stringify(data, null, 2));
    // console.log('-------------------');
    const valid        = data.isValid();
    const isSubmission = data.type === 'submission';
    const isValidation = data.type === 'validation';
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
