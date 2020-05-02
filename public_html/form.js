'use strict';

import {konz}           from './constants.js';
import {MemeClass}      from './meme.js';
import {Voyeur}         from "./voyeur.js";
import {FormValidation as validation} from "./form-validation.js";
import {Utils}          from "./utils.js";

export class Form extends Voyeur {

  constructor() {
    super();
    // this.validation = new FormValidation();
  }

  // static init(){
  //   FormValidation.init();
  // }
  // static goMeme = function () {
  //   const meme = MemeClass
  //     .builder()
  //     .addImg(konz.form.url.value)
  //     .addTop(konz.form.top.value)
  //     .addBtm(konz.form.btm.value)
  //     .build()
  //     .getMeme();
  //   konz.divs.memes.append(meme);
  //   konz.divs.memes.scrollTop = konz.divs.memes.scrollHeight;
  // };


  update(data) {
    console.log('Form/update(data)/data', data);
  }



  submit() {
    // let isSubmit = true;
    // validation.validation();
  }
}
