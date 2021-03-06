/* global expect, describe, it */
import scenarios from './data/scenarios.js';

describe('The value',function(){
  for(var i in scenarios){
    let {actual,expected,result,itActual,itExpected} = scenarios[i];
    it(`${itActual} is expected ${result?'':'not '}to be ${itExpected} [nb. item: ${i}]`,function(){
      expect(this.ofType(actual,expected)).toBe(result);
    });
  }
});