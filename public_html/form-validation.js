"use strict";

import {konz}          from "./constants.js";
import {Form}          from "./form.js";
import {Exhibitionist} from "./exhibitionist.js";
import {Utils}         from "./utils.js";

export class FormValidation extends Exhibitionist {
  // static exhibit = new Exhibitionist();
  // static voyeur = Form;
  // @formatter:off
  // /*
  //  * state template
  //
  // this.state = {
  //   url: {
  //     changed: false,
  //     valid: false,
  //     err: ''
  //   },
  //   top: {
  //     changed: false,
  //     valid: false,
  //     err: ''
  //   },
  //   btm: {
  //     changed: false,
  //     valid: false,
  //     err: ''
  //   }
  // };
  // */
  // // @formatter:on
  static state = {
    url: {
      valid: null,
      err  : []
    },
    top: {
      valid: null,
      err  : []
    },
    btm: {
      valid: null,
      err  : []
    },
    isValid() {
      return this.url.valid && this.top.valid && this.btm.valid;
    },
    reset(key) {
      this[key] = {
        valid: null,
        err  : []
      };
    },
    resetAll() {
      this.url = {
        valid: null,
        err  : []
      };
      this.top = {
        valid: null,
        err  : []
      };
      this.btm = {
        valid: null,
        err  : []
      };
    },
    updateErr(key, err) {
      console.log('key, err', key, err);
      if (this[key].err.length === 0 || !this[key].err.includes(err)) {
        this[key].err.push(err);
      }
      console.log('this[key].err', this[key].err);
    }
  };


  constructor(form) {
    super();
    //
    // this.state = {
    //   isValid: function () {
    //     return this.url.valid && this.top.valid && this.btm.valid;
    //   }
    // };


    this.voyeur = form;
    this
      .addVoyeur(this.voyeur);
    // this.exhibit = new Exhibitionist();
    // this.voyeur  = new Form();
    //
    // this.addVoyeur(voyeur);
  }

  onSubmit() {

  }

  onInputEvent(e) {
    console.clear();

    const key     = Utils.htmlIdToJs('meme-', e.target.id);
    const value   = e.target.value;
    const self    = this;
    const promiss = [];
    console.log('onInputEvent', e);
    //
    //
    (function () {
      if (e.type === 'focusout') {
        FormValidation.state.reset(key);
        if (key === 'url') {
          promiss.push(self.validateUrl(value));
        }
        const cbw = new Promise((resolve) => {
          const valid = !self.containsBadWord(value);
          if (!valid) {
            FormValidation.state.updateErr(key, 'bdw');
          }
          resolve(valid);
        });
        promiss.push(cbw);
        const result = Promise.all(promiss).then((values) => {
          console.log('values', values);
          self.notify(FormValidation.state);
          console.log('--- onInputEvent ---');
          console.log('target', e.target, 'value', value);
          console.log('state', JSON.stringify(FormValidation.state, null, 2),
                      '\nkey', key, 'e.type', e.type);
        });
        console.log('onInputEvent/result', result);
      }


    }());
  }

  // onInputClick(e) {
  //   const errKey                = +'Err';
  //   const valid                 = this.validation();
  //   konz.form[errKey].innerText = '';
  //   // console.log('onInputFocusClick/valid', valid);
  // }
  //
  // onInputFocusOut(e) {
  //   const errKey = Utils.htmlIdToJs('meme-', e.target.id) + 'Err';
  //   // console.log('errKey', errKey);
  //   // const valid = formjs.validateInputs();
  //   const valid = this.validation();
  //   // console.log('onInputFocusOut/valid', valid);
  // }

  validateUrl(imgUrl) {
    konz.init();
    self = this;
    return fetch(imgUrl)
      .then((response) => {
        const valid                       = response.status === 200;
        FormValidation.state.url['valid'] = valid;
        if (!valid) {
          FormValidation.state.updateErr('url', response.status);
        }
        return valid;
      })
      .catch((err) => {
        FormValidation.state.url['valid'] = false;
        FormValidation.state.updateErr('url', err.stack);
        return false;
      });
  };

  // setStateChanged(obj, previous) {
  //   obj.changed = previous === undefined ? true : obj.valid !== previous;
  //   // console.log('obj', obj, 'obj.changed', obj.changed, 'obj.valid',
  //   // obj.valid, 'previous', previous);
  // }

  containsBadWord(value) {
    return value.toLowerCase().containsBadWords();
  }

  // validateInputs() {
  //
  //   const self = this;
  //   return new Promise((resolve) => {
  //     function containsBadWords(elem) {
  //       return konz.form[elem].value.toLowerCase().containsBadWords();
  //     }
  //
  //     let cbw;
  //     let previous;
  //     ['top', 'url', 'btm'].forEach(value => {
  //       cbw = containsBadWords(value);
  //       if (cbw) {
  //         // err                 = value + 'Err';
  //         // form[err].innerText = konz.errMsg.badWords;
  //         console.log('value', value);
  //         previous          =
  //           FormValidation.state[value] === undefined ? undefined :
  //           FormValidation.state[value].valid;
  //         FormValidation.state[value] = {
  //           valid: false,
  //           err  : 'Bad Words'
  //         };
  //         // self.setStateChanged(FormValidation.state[value], previous);
  //       } else {
  //         FormValidation.state[value] = {
  //           valid: true,
  //           err  : ''
  //         };
  //       }
  //     });
  //     // self.notify(FormValidation.state);
  //     resolve(FormValidation.state.isValid());
  //   });
  // }
  // ;

  // getState() {
  //   return this.state;
  // }

  // validation() {
  //   // console.clear();
  //   konz.init();
  //   // const self = this;
  //   // return this.validateInputs()
  //   //            .then(this.validateUrl())
  //   //            .then(function (result) {
  //   //              //
  // console.log('***********form-validation/validation/valid', //
  // //             result); //              return result; //            });
  // // Form.validateInputs().then((valid) => { //   console.log('valid/1',
  // valid); //   // valid = valid && valid; //   // console.log('valid/1a',
  // valid); //   return valid; // }).then((valid) => { //
  // console.log('valid/2', valid); //   valid =
  // Form.validateUrl(konz.form.url.value) && valid; //
  // console.log('valid/2a', valid); //   return valid; // }).then(valid => {
  // //   console.log('submit/valid', valid); //   if (valid && isSubmit) { //
  //    Form.goMeme(); //   } // }); }

}


