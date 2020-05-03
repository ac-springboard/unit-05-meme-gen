'use strict';

import {konz}                         from './constants.js';
import {MemeClass}                    from './meme.js';
import {Voyeur}                       from "./voyeur.js";
import {FormValidation as validation} from "./form-validation.js";
import {Utils}                        from "./utils.js";

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
    console.log('Form/update(data)/data', JSON.stringify(data, null, 2 ));
    console.log('-------------------');
    // let errKey;
    // ['url', 'top', 'btm'].forEach((value) => {
    //   console.log('value', value, 'errKey', 'data[value]', data[value], 'valid', data[value].valid);
    //   errKey = value + 'Err';
    //   // if (data[value].changed) {
    //     if (data[value].valid) {
    //       konz.form[errKey].innerHTML = '';
    //     } else {
    //       konz.form[errKey].innerHTML = data[value].err;
    //     }
    //   console.log('konz.form[errKey]',konz.form[errKey]);
    //   // }
    // });
  }

  submit() {
    // let isSubmit = true;
    // validation.validation();
  }
}
