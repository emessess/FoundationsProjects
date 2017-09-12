const fs = require('fs');

// processing CMUDict toString
const dictionary = fs.readFileSync('./cmudict.txt').toString();
//removing alternate pronunciations
const dictArray = dictionary.split('\n')
    .map(entry => entry.split(' '))
    .filter(el => el[0].indexOf('(') === -1);

//function for counting syls in a given entry
const countSyllables = arr => 
  arr.reduce((total, ele) => /\d/.test(ele) ? ++total : total, 0);

//function for random nums 
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//creating an object with keys representing no of syllables and values being arrays of word matching that count
const sylDict = dictArray.reduce((acc, ele) => {
  let count = countSyllables(ele);
  if (acc.hasOwnProperty(count)){
    acc[count].push(ele.slice(0,1));
    return acc; 
  } else {
    acc[count] = [ele.slice(0,1)];
    return acc;
  }
}, {});

//main function
const createHaiku = (...args) => {
  console.log(args.reduce((poem, line) => poem += createLine(line) + '\n', ''))
}

//line function
const createLine = structure => 
   structure.reduce((str, line) => {
    let randomIndex = getRandomInt(0, sylDict[line].length);
    str += sylDict[line][randomIndex] + ' ';
    return str;
  }, '')

module.exports = {
  createHaiku: createHaiku,
};
