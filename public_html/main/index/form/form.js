'use strict';

import {konz}      from '../../../constants.js';
import {MemeClass} from '../../factory/meme.js';

export class Form {

  static validateUrl = function (imgUrl) {
    konz.init();
    return fetch(imgUrl)
      .then((response) => {
        console.log('validateUrl/response', response, 'imgUrl', imgUrl);
        console.log('response.status', response.status);
        if (response.status === 200) {
          console.log('whoowhoo!',);
          // konz.divs.memes.append( )
        } else {
          console.log('konz.form.url', konz.form.url,
                      document.getElementById("meme-url"),
                      document.activeElement);
          // if (!document.getElementById("meme-url").hasFocus()) {
          konz.form.urlErr.innerHTML =
            'Oops! Something doesn\'t seem ok (' + (response.status) + ')';
          console.log('konz.form.urlErr', konz.form.urlErr);
          // } else {
          //
          //   konz.form.urlErr.innerHTML = '';
          // }
        }
        console.log('before returning response.ok', response.ok,
                    response.status);
        return response.ok;
      })
      .catch((err, b) => {
        konz.form.urlErr.innerHTML = 'Oops! Something doesn\'t seem ok';
        console.log('Error/SEVERE:', err, b);
        return false;
      });
  };

  static validateInputs = function () {
    konz.init();
    return new Promise((resolve) => {
      const form = konz.form;
      let valid  = true;

      function containsBadWords(elem) {
        return form[elem].value.toLowerCase().containsBadWords();
      }

      let err;
      ['top', 'url', 'btm'].forEach(value => {
        let cbw = containsBadWords(value);
        if (cbw) {
          err                 = value + 'Err';
          form[err].innerText = konz.errMsg.badWords;
          valid               = false;
        }
      });
      resolve(valid);
    });
  };

  static goMeme = function () {
    const meme = MemeClass
      .builder()
      .addImg(konz.form.url.value)
      .addTop(konz.form.top.value)
      .addBtm(konz.form.btm.value)
      .build()
      .getMeme();
    konz.divs.memes.append(meme);
    konz.divs.memes.scrollTop = konz.divs.memes.scrollHeight;
  };

  static validation(isSubmit = false) {
    // console.clear();
    konz.init();
    Form.validateInputs().then((valid) => {
      console.log('valid/1', valid);
      // valid = valid && valid;
      // console.log('valid/1a', valid);
      return valid;
    }).then((valid) => {
      console.log('valid/2', valid);
      valid = Form.validateUrl(konz.form.url.value) && valid;
      console.log('valid/2a', valid);
      return valid;
    }).then(valid => {
      console.log('submit/valid', valid);
      if (valid && isSubmit) {
        Form.goMeme();
      }
    });
  }

  static submit() {
    let isSubmit = true;
    Form.validation(isSubmit);
  }
}
