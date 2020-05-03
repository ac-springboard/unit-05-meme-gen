'use strict';

import {FormValidation as formval} from "./form-validation.js";
import {Exhibitionist}             from "./exhibitionist.js";

export class Form extends Exhibitionist {

  constructor( index ) {
    super();
    this.formval = new formval(this);
    this.addVoyeur( index );
  }

  getFormVal() {
    return this.formval;
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
    console.log('Form/update(data)/data', JSON.stringify(data, null, 2));
    console.log('-------------------');
    data.type = 'validation';
    this.notify( data );
  }

  submit() {
    this.formval.validateAll().then((data) => {
      data.type = 'submission';
      this.notify( data );
      console.log('form/submit/data', data);
    });
  }
}
