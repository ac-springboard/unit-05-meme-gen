'use strict';

const badWords = [
  'bad word', 'trump'
];

String.prototype.containsBadWords = function () {
  const regexp = /\w+/g;
  const words = this.valueOf().toLowerCase().match(regexp);
  console.log( 'words', words );
  words.forEach( word => {
    if ( badWords.includes( word )){
      return true;
    }
  });
  return false;
  // const result = badWords.includes(str);
  // return result;
};
