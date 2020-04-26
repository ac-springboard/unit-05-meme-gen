'use strict';

import {konz}      from '../../../constants.js';
import {MemeClass} from '../../factory/meme.js';

export class Form {

  static validateUrl = function (imgUrl) {
    return fetch(imgUrl).then((response) => {
      console.log('validateUrl/response', response, 'imgUrl', imgUrl );
      if ( !response.ok ){
        konz.form.urlErr.value = 'Oops! Something doesn\'t seem ok';
      }
      return response.ok;
    }).catch((err) => {
      konz.form.urlErr.innerHTML = 'Oops! Something doesn\'t seem ok';
      console.log('Error/SEVERE:', err);
      return false;
    });
  };

  // static validateSanitized = function () {
  //   return new Promise((accept, reject) => {
  //     return Form.validateInputs();
  //   });
  // };

  static validateInputs = function () {
    konz.init();
    return new Promise((resolve ) => {
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
      resolve(valid);
    });
  };

  static goMeme = function() {
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

  static submit() {
    konz.init();
    console.clear();
    // let valid1 = Form.validateUrl(konz.form.url.value);
    // console.log('valid1', valid1);

    // let valid2 = Form.validateInputs().then(result => {
      //   console.log('result', result);
      // });
      // console.log('valid2', valid2);

    let valid = false;
    Promise.all([Form.validateInputs(), Form.validateUrl(konz.form.url.value)]).then( ([valid1, valid2]) =>{
      console.log( 'valid1', valid1, 'valid2', valid2 );
      if ( valid1 && valid2 ){
        Form.goMeme();
      }
    });


    // if (true) {
    //   return;
    // }
    // let validation = Promise.all([Form.validateUrl, Form.validateSanitized]);
    // console.log('validation', validation);
    // let valid = validation.resolve().then((result) => {
    //   console.log('valid', result);
    // });
    // console.log('valid', valid);
    // if (valid) {
      // console.log('Valid', 'Submitting...');

    // }
  }
}
