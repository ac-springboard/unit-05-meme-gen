"use strict";

/*
 This class is supposed to provide integration with the index.html file.
 */

import {Form as form} from "./form.js";

export class Index {

  constructor() {
    this.form = new form(this);
  }

  getForm() {
    return this.form;
  }

  update(data) {
    console.log('Index/update(data)/data', JSON.stringify(data, null, 2));
    console.log('-------------------');
    const valid = data.isValid();
    const isSubmission = data.type === 'submission';
    const isValidation = data.type === 'validation';
    if ( isSubmission ){
      if ( valid ) {
        console.log('Valid submission.', 'Moving forward.');
      } else {
        console.log('INvalid submission.', 'Please, review the form data.');
      }
    } else if ( isValidation ){

      if (valid ){
        console.log('Valid data.', 'Submit?');
      } else {
        console.log('Invalid data.', 'Back to form...');
      }
    }
  }

}
