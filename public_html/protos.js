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
    // console.log('protos.js/containsBadWords', 'input is empty');
    return !words;
  };

  const inputIsBadWord = function () {
    // console.log('protos.js/containsBadWords', 'input IS a bad word ->', value);
    return badWords.includes(value);
  };

  const inputInnerWordIsABadWord = function () {
    for (let i = 0; i < words.length; i++) {
      if (badWords.includes(words[i])) {
        // console.log('protos.js/containsBadWords',
        //             'input inner word is a bad word ->', words[i]);
        return true;
      }
    }
    return false;
  };

  const inputInnerExpressionIsABadWord = function () {
    let regexpExpression;
    for (let i = 0; i < badWords.length; i++) {
      regexpExpression = new RegExp('\\W(' + badWords[i] + ')\\W', 'img');
      // console.log('regexpExpression', regexpExpression);
      if (value.match(regexpExpression)) {
        // console.log('protos.js/containsBadWords',
                    // 'input inner expression is a bad word ->', badWords[i]);
        return true;
      }
    }
    return false;
  };

  return !emptyInput() && (inputIsBadWord() || inputInnerWordIsABadWord() ||
                           inputInnerExpressionIsABadWord());

};
