'use strict';

import {Form}           from './form.js';
import {konz}           from "./constants.js";
import {Utils}          from "./utils.js";
import {MemeClass}      from "./meme.js";
import {FormValidation} from "./form-validation.js";
import {Index}          from "./index.js";

konz.init();

// Fetish chain
//
const index   = new Index();
const form    = index.getForm();
const formval = form.getFormVal();


(function () {
  konz.form.form
      .addEventListener('submit', (e) => {
        e.preventDefault();
        form.submit();
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
