'use strict';

const badWords = [
  'bad word', 'trump'
];

String.prototype.containsBadWords = function () {
  const regexpWord = /\w+/g;
  const value      = this.valueOf().toLowerCase();
  const words      = value.match(regexpWord);
  // console.log('words', words);

  const emptyInput = function () {
    return !words;
  };

  const inputIsBadWord = function () {
    return badWords.includes(value);
  };

  const inputInnerWordIsABadWord = function () {
    for (let i = 0; i < words.length; i++) {
      if (badWords.includes(words[i])) {
        return true;
      }
    }
    return false;
  };

  const inputInnerExpressionIsABadWord = function () {
    let regexpExpression;
    for (let i = 0; i < badWords.length; i++) {
      regexpExpression = new RegExp('(\\W){0,}(' + badWords[i] + ')\\W', 'g');
      if (value.match(regexpExpression)) {
        console.log('found!');
        return true;
      }
    }
    return false;
  };

  return !emptyInput() && (inputIsBadWord() || inputInnerWordIsABadWord() ||
                           inputInnerExpressionIsABadWord());

};
