'use strict';

import {Form}           from './form.js';
import {konz}           from "./constants.js";
import {FormValidation} from "./form-validation.js";
import {Index}          from "./index.js";
import {IO}             from "./io.js";
import {MemeBuilder}    from "./meme.js";

konz.init();

// Fetish chain
//
const io      = new IO();
const index   = new Index();
const form    = new Form();
const formval = new FormValidation();
const meme    = new MemeBuilder();

//
// index is observed by io
index.addVoyeur(io);
//
// form is observed by index
form.addVoyeur(index);
//
// formval is observed by form
formval.addVoyeur(form);
//
// meme is observed by index
meme.addVoyeur(index);


(function () {
  window.onload = function () {
    io.loadList(index);
    formval.validateAll();
  };
})();

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
