'use strict';

import {konz}           from '../../../constants.js';
import {MemeClass}      from '../../factory/meme.js';
import {Voyeur}         from "../../../voyeur.js";
import {FormValidation} from "./form-validation.js";

export class Form extends Voyeur {

  static init(){
    FormValidation.init();
  }
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


  update( data ){
    console.log('Form/update(data)/data', data);
  }

  static submit() {
    let isSubmit = true;
    Form.validation(isSubmit);
  }
}
