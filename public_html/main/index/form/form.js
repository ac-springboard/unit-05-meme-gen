'use strict';

import {konz}      from '../../../constants.js';
import {MemeClass} from '../../factory/meme.js';

export class Form {

  // static validateUrl = function () {
  //   fetch(
  //     'https://www.statnews.com/wp-content/uploads/2020/02/Coronavirus-CDC.jpg',
  //     {
  //       headers: {
  //         'Access-Control-Allow-Origin': '*'
  //       },
  //       mode   : 'cors'
  //     })
  //     .then((response) => {
  //       console.log('response', response);
  //       return response.ok;
  //     }).catch((err) => {
  //     console.log('Error/SEVERE:', err);
  //     return err;
  //   });
  //   fetch('https://www.reddit.com/r/javascript/top/.json?limit=5')
  //     .then(res => console.log(res));
  //   fetch('https://i.stack.imgur.com/LvinM.jpg')
  //     .then(res => console.log(res));
  // };

  static validateSanitized = new Promise((accept, reject) => {
    return Form.validateInputs();
  });

  static init() {

  }

  static submit() {
    konz.init();
    console.clear();
    // let valid1 = Promise.resolve(Form.validateUrl);
    // let valid1 = Form.validateUrl();
    // valid1.then((result) => {
    //   console.log('valid1/result', result);
    // });

    if (true) {
      return;
    }
    let validation = Promise.all([Form.validateUrl, Form.validateSanitized]);
    console.log('validation', validation);
    let valid = validation.resolve().then((result) => {
      console.log('valid', result);
    });
    console.log('valid', valid);
    if (valid) {
      // console.log('Valid', 'Submitting...');
      const meme = MemeClass
        .builder()
        .addImg(konz.form.url.value)
        .addTop(konz.form.top.value)
        .addBtm(konz.form.btm.value)
        .build()
        .getMeme();
      konz.divs.memes.append(meme);
      konz.divs.memes.scrollTop = konz.divs.memes.scrollHeight;
    }
  }

  static validateInputs() {
    konz.init();
    const form = konz.form;
    let valid  = true;

    function containsBadWords(elem) {
      return form[elem].value.toUpperCase().containsBadWords();
    }

    let err;
    ['top', 'url', 'btm'].forEach(value => {
      if (containsBadWords(value)) {
        err                 = value + 'Err';
        form[err].innerText = konz.errMsg.badWords;
        valid               = false;
      }
    });

    return valid;
  }
}
