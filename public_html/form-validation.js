"use strict";

import {konz}          from "./constants.js";
import {Exhibitionist} from "./exhibitionist.js";
import {Utils}         from "./utils.js";

/**
 * This class is observed by form
 */
export class FormValidation extends Exhibitionist {

  static state = {
    type: '',
    url: {
      valid: null,
      err  : []
    },
    top: {
      valid: null,
      err  : []
    },
    btm: {
      valid: null,
      err  : []
    },
    isValid() {
      return this.url.valid && this.top.valid && this.btm.valid;
    },
    reset(key) {
      this[key] = {
        valid: null,
        err  : []
      };
    },
    resetAll() {
      this.url = {
        valid: null,
        err  : []
      };
      this.top = {
        valid: null,
        err  : []
      };
      this.btm = {
        valid: null,
        err  : []
      };
    },
    updateErr(key, err) {
      // console.log('key, err', key, err);
      if (this[key].err.length === 0 || !this[key].err.includes(err)) {
        this[key].err.push(err);
      }
      // console.log('this[key].err', this[key].err);
    }
  };

  constructor() {
    super();
  }

  validateAll() {
    const self = this;
    return new Promise((resolve) => {
      FormValidation.state.resetAll();
      const promiseArray = [];
      promiseArray.push(self.validateUrl(konz.form.url.value));
      promiseArray.push(self.containsBadWord('url', konz.form.url.value));
      promiseArray.push(self.containsBadWord('top', konz.form['top'].value));
      promiseArray.push(self.containsBadWord('btm', konz.form['btm'].value));
      const result = self.validatePromises(promiseArray).then(function() {
        return FormValidation.state;
      });
      resolve( result );
    });
  }

  onInputEvent(e) {
    // console.clear();
    const key          = Utils.htmlIdToJs('meme-', e.target.id);
    const value        = e.target.value;
    const promiseArray = [];
    if (e.type === 'focusout') {
      FormValidation.state.reset(key);
      if (key === 'url') {
        promiseArray.push(this.validateUrl(value));
      }
      promiseArray.push(this.containsBadWord(key, value));
      this.validatePromises(promiseArray);
    }
  }

  validatePromises(promiseArray) {
    const self = this;
    return Promise.all(promiseArray).then((values) => {
      self.notify(FormValidation.state);
      return values;
    });
  }

  containsBadWord(key, value) {
    return new Promise((resolve) => {
      const valid = !value.toLowerCase().containsBadWords();
      FormValidation.state[key].valid = valid;
      if (!valid) {
        FormValidation.state.updateErr(key, 'bdw');
      }
      resolve(valid);
    });
  }

  validateUrl(imgUrl) {
    konz.init();
    self = this;
    return fetch(imgUrl)
      .then((response) => {
        const valid                       = response.status === 200;
        FormValidation.state.url['valid'] = valid;
        if (!valid) {
          FormValidation.state.updateErr('url', response.status);
        }
        return valid;
      })
      .catch((err) => {
        FormValidation.state.url['valid'] = false;
        FormValidation.state.updateErr('url', "777");
        return false;
      });
  };
}
