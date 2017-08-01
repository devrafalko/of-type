module.exports = function(val,type){
  var isTypeString = typeof type==='string';
  var isTypeRegExp = type&&type.constructor.name.toLowerCase()==='regexp';
  if(!(isTypeString||isTypeRegExp)){
    var error = new TypeError('\x1b[31mThe second argument must be of type [String|RegExp].\x1b[0m');
    throw error;
  }
  var reg = /^\[object Arguments\]$/i;
  if(isTypeString){
    var t = type.toLowerCase().split('|');
    if((t.length===1&&t[0]==='')||(t.some((i)=>i==='any'))) return true;
    if(t.some((i)=>i==='truthy')&&!!val) return true;
    if(t.some((i)=>i==='falsy')&&!val) return true;
    if(typeof val==='undefined'&&t.some((i)=>i==='undefined')) return true;
    if(val===null&&t.some((i)=>i==='null')) return true;
    if(val===null||val===undefined) return false;
    if((reg).test(val.toString())&&val.constructor.name==='Object'&&t.some((i)=>i==='arguments')) return true;
    return t.some((i)=>i===val.constructor.name.toLowerCase());
  }

  if(isTypeRegExp){
    if(type.test('any')||type.test('')) return true;
    if(type.test('truthy')&&!!val) return true;
    if(type.test('falsy')&&!val) return true;
    if(type.test('undefined')&&typeof val==='undefined') return true;
    if(type.test('null')&&val===null) return true;
    if(val===null||val===undefined) return false;
    if(type.test('arguments')&&val.constructor.name==='Object'&&(reg).test(val.toString())) return true;
    return type.test(val.constructor.name);
  }
};