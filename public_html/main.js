'use strict';

import {Form}           from './form.js';
import {konz}           from "./constants.js";
import {Utils}          from "./utils.js";
import {MemeClass}      from "./meme.js";
import {FormValidation} from "./form-validation.js";

konz.init();


const form = new Form();

//  Form observes FormValidation
//
const formval = new FormValidation( form );

(function () {
  konz.form.form
      .addEventListener('submit', (e) => {
        e.preventDefault();
        formval.onSubmit(e);
      });
})();

(function () {
  konz.form.inputs.forEach((inputElem) => {
    inputElem.addEventListener('click', (e) => {
      console.log('Notify index.html');
    });
    inputElem.addEventListener('focusout', (e) => {
      formval.onInputEvent(e);
    });
  });
})();
