/* global expect, describe, beforeEach, it */

describe('When the module is executed without any arguments',function(){
  beforeEach(function(){
    this.b = this.ofType.bind(this);
  });
  
  it('it should return false',function(){
    expect(this.b()).toBe(false);
  });
  it('it should not throw an error',function(){
    expect(this.b).not.toThrowError();
  });
});

describe('When the module is executed without the second [type] parameter',function(){
  beforeEach(function(){
    this.b = this.ofType.bind(this,'hello');
  });
  
  it('it should return false',function(){
    expect(this.b()).toBe(false);
  });
  it('it should not throw an error',function(){
    expect(this.b).not.toThrowError();
  });
});