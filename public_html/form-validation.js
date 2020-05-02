"use strict";

import {konz}          from "./constants.js";
import {Form}          from "./form.js";
import {Exhibitionist} from "./exhibitionist.js";
import {Utils}         from "./utils.js";

export class FormValidation extends Exhibitionist {
  // static exhibit = new Exhibitionist();
  // static voyeur = Form;
  // static state   = {
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
  // };

  constructor(form) {
    super();
    //
    this.state = {
      getValid: function () {
        return this.url.valid && this.top.valid && this.btm.valid;
      }
    };

    this.voyeur = form;
    this.addVoyeur(this.voyeur);
    // this.exhibit = new Exhibitionist();
    // this.voyeur  = new Form();
    //
    // this.addVoyeur(voyeur);
  }

  onSubmit() {

  }

  onInputClick(e) {
    const errKey                = Utils.htmlIdToJs('meme-', e.target.id) +
                                  'Err';
    const valid                 = this.validation();
    konz.form[errKey].innerText = '';
    console.log('onInputFocusClick/valid', valid);
  }

  onInputFocusOut(e) {
    const errKey = Utils.htmlIdToJs('meme-', e.target.id) + 'Err';
    // console.log('errKey', errKey);
    // const valid = formjs.validateInputs();
    const valid = this.validation();
    console.log('onInputFocusOut/valid', valid);
  }

  validateUrl(imgUrl) {
    const self = this;
    konz.init();
    return fetch(imgUrl)
      .then((response) => {
        self.state.url = {
          valid: response.status === 200,
          err  : response.status
        };
        //   konz.form.urlErr.innerHTML =
        self.notify(self.state);
      })
      .catch((err) => {
        self.state.url = {
          valid: false,
          err  : err
        };
        self.notify(self.state);
      });
  };

  validateInputs() {

    const self = this;
    return new Promise((resolve) => {
      function containsBadWords(elem) {
        return konz.form[elem].value.toLowerCase().containsBadWords();
      }

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
      self.notify(self.state);
      resolve(self.state.getValid());
    });
  };

  getState() {
    return this.state;
  }

  validation() {
    // console.clear();
    konz.init();
    // const self = this;
    return this.validateInputs()
        .then(this.validateUrl())
        .then(function ( result ) {
          console.log('***********form-validation/validation/valid', result);
          return result;
        });


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


