"use strict";

export class MemeClass {
  // meme = document.createElement('div');
  constructor( meme ){
    this.meme = meme;
  }
  getMeme(){
    return this.meme;
  }
  // constructor(builder) {
  //   this.top = builder.top;
  //   this.btm = builder.btm;
  // }

  // getTop() {
  //   return this.top;
  // }
  //
  // getBtm() {
  //   return this.btm;
  // }

  static builder = function() {
    // const self = this.builder;
    console.log('who is this?', this );
    let top;
    let btm;
    let meme = document.createElement('div');
    return {
      addTop(formTop) {
        top = document.createElement('div');
        top.innerText = formTop;
        top.classList.add('memeText');
        meme.append(top);
        // self.getMeme().append(top);
        // console.log('meme/top', self.meme);
        // return MemeClass.builder;
        return this;
      },
      addBtm(formBtm) {
        btm = document.createElement('div');
        btm.innerText = formBtm;
        btm.classList.add('memeText');
        meme.append(btm);
        // self.meme.append(btm);
        // return MemeClass.builder;
        return this;
      },
      build () {
        console.log( 'build/meme', meme );
        meme.classList.add('meme-elem');
        const memeClass = new MemeClass(meme);
        return memeClass;
      }
    }
  };
}

//   builder(){
//     const self = this;
//     let base = document.createElement('div');
//     let img = document.createElement('img');
//     let top = document.createElement('div');
//     let btm = document.createElement('div');
//     return {
//       makeBase(color) {
//         return this;
//       },
//       addImg( urlForm ){
//         img.setAttribute('src', urlForm );
//         img.classList.add('img');
//         return this;
//       },
//       addTop( topForm ){
//         return this;
//       },
//       addBtm( btmForm){
//         return this;
//       },
//       build(){
//
//       }
//     }
//
//   }


// }

// MemeClass.Builder = class Builder
//
// };
