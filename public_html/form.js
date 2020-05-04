'use strict';

import {Exhibitionist} from "./exhibitionist.js";

/**
 * This class observers form-validation
 * This class is observed by index
 */
export class Form extends Exhibitionist {

  constructor() {
    super();
  }

  update(data) {
    data.type = 'validation';
    this.notify(data);
  }

  submit(formval) {
    formval.validateAll().then((data) => {
      data.type = 'submission';
      this.notify(data);
    });
  }
}
