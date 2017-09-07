const fs = require('fs');
const dictionary = fs.readFileSync('./cmudict.txt').toString();
const dictArray = dictionary.split('\n').map(entry => entry.split(' ')).filter(el => el[0].indexOf('(') === -1);

const countSyllables = arr => 
  arr.reduce((total, ele) => /\d/.test(ele) ? ++total : total, 0);

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}// console.log(countSyllables(dictArray[0]).toString());
// console.log(dictArray);

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

const createHaiku = structure => {
  const myHaiku = structure.reduce((str, line) => {
    let randomIndex = getRandomInt(0, sylDict[line].length);
    str += sylDict[line][randomIndex] + '\n';
    return str;
  }, '')

  console.log(myHaiku.slice(0, -1));

}

// console.log(createHaiku([2, 5, 3]));

module.exports = {
  createHaiku: createHaiku,
};
