'use strict';

/**
 *
 * Static Divs
 */
  // @formatter:off
const mainDiv  = document.querySelector('#main-div');
  const leftDiv  = document.querySelector('#left-div');
    const infoDiv  = document.querySelector('#info-div');
    const formDiv  = document.querySelector('#form-div');
      const top    = document.querySelector('#meme-top');
      const topErr = document.querySelector('#meme-top-err');
      const url    = document.querySelector('#meme-url');
      const urlErr = document.querySelector('#meme-url-err');
      const btm    = document.querySelector('#meme-btm');
      const btmErr = document.querySelector('#meme-btm-err');
  const memesDiv = document.querySelector('#memes-div');
// @formatter:on

export class konz {

  static init() {
    konz.divs = {
      main: mainDiv,
      left: leftDiv,
      info: infoDiv,
      memes: memesDiv
    };
    konz.form    = {
      form  : formDiv,
      top   : top,
      topErr: topErr,
      url   : url,
      urlErr: urlErr,
      btm   : btm,
      btmErr: btmErr,
      inputs: [
        top, url, btm
      ],
      errs  : [
        topErr, urlErr, btmErr
      ]
      // console.log('konz.form', JSON.stringify(konz.form));
    };
    konz.err  = {
      bdw:{
        msg: "Please, avoid to use bad words"
      }
    };
    konz.symbols = {
      remove: '⊗'
    };
    konz.css     = {
      memeTextFontSize: '2.2vw',
      memeTextMaxFontSize: '3.2vw'
    }
  }
}

