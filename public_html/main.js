'use strict';

import {Form}           from './form.js';
import {konz}           from "./constants.js";
import {FormValidation} from "./form-validation.js";
import {Index}          from "./index.js";

konz.init();

// Fetish chain
//
const index   = new Index();
const form    = new Form();
const formval = new FormValidation();

form.addVoyeur(index);
formval.addVoyeur(form);

window.onload = function () {
  formval.validateAll();
};

(function () {
  konz.form.form
      .addEventListener('submit', (e) => {
        e.preventDefault();
        form.submit(formval);
      });
})();

(function () {
  konz.form.inputs.forEach((inputElem) => {
    inputElem.addEventListener('click', (e) => {
      console.log('Notify index.html');
      index.onInputClick(e);
    });
    inputElem.addEventListener('focusout', (e) => {
      formval.onInputEvent(e);
    });
  });
})();
