/* global expect */

const path = require('path');
const ofType = require(path.resolve('./index.js'));
const scenarios = require('./scenarios.js');

describe("The value",function(){
  for(var i in scenarios){
    let {actual,expected,result,itActual,itExpected} = scenarios[i];
    it(`${itActual} is expected ${result?'':'not '}to be ${itExpected} [nb. item: ${i}]`,function(){
      expect(ofType(actual,expected)).toBe(result);
    });
  }
});