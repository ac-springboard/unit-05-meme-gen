"use strict";

import {Exhibitionist} from "../../../exhibitionist.js";
import {konz}          from "../../../constants.js";
import {Form}          from "./form.js";

export class FormValidation extends Exhibitionist {
  static exhibit = new Exhibitionist();
  static voyeur = Form;
  static state   = {
    // isValidUrl: {
    //   itIs: false,
    //   err : 'Unknown'
    // },
    // isValidTop: {
    //   itIs: false,
    //   err : 'Unknown'
    // },
    // isValidBtm: {
    //   itIs: false,
    //   err : 'Unknown'
    // }
  };

  static init(){
    FormValidation.exhibit.addVoyeur( FormValidation.voyeur );
  }

  static validateUrl = function (imgUrl) {
    const self = FormValidation;
    konz.init();
    return fetch(imgUrl)
      .then((response) => {
        self.state.url = {
          valid: response.status === 200,
          err  : response.status
        };
        //   konz.form.urlErr.innerHTML =
        //     'Oops! Something doesn\'t seem ok (' + (response.status) + ')';
        //   console.log('konz.form.urlErr', konz.form.urlErr);
        // return response.ok;
        self.exhibit.notify(self.state);
      })
      .catch((err) => {
        // konz.form.urlErr.innerHTML = 'Oops! Something doesn\'t seem ok';
        self.state.url = {
          valid: false,
          err  : err
        };
        self.exhibit.notify(self.state);
      });
  };

  static validateInputs = function () {
    // konz.init();
    // const form = konz.form;
    // let valid = true;


    function containsBadWords(elem) {
      return form[elem].value.toLowerCase().containsBadWords();
    }

    let err;
    let cbw;
    ['top', 'url', 'btm'].forEach(value => {
      cbw = containsBadWords(value);
      if (cbw) {
        // err                 = value + 'Err';
        // form[err].innerText = konz.errMsg.badWords;
        self.state[value] = {
          valid: false,
          err  : 'Bad Words'
        };
      } else {
        self.state[value] = {
          valid: true,
          err  : ''
        };
      }
    });
    self.exhibit.notify(self.state);
  };

  // static validation(isSubmit = false) {
  static validation() {
    // console.clear();
    konz.init();
    FormValidation.validateInputs()
                  .then(FormValidation.validateUrl());
    // Form.validateInputs().then((valid) => {
    //   console.log('valid/1', valid);
    //   // valid = valid && valid;
    //   // console.log('valid/1a', valid);
    //   return valid;
    // }).then((valid) => {
    //   console.log('valid/2', valid);
    //   valid = Form.validateUrl(konz.form.url.value) && valid;
    //   console.log('valid/2a', valid);
    //   return valid;
    // }).then(valid => {
    //   console.log('submit/valid', valid);
    //   if (valid && isSubmit) {
    //     Form.goMeme();
    //   }
    // });
  }

}


