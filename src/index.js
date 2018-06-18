const _g = (function () { return global || window; }).bind(this);

module.exports = function(value, type) {
  const isTypeDefined = arguments.length >= 2;
  const isTypeString = typeof type === 'string';
  const isTypeFunction = typeof type === 'function';
  const isTypeUndefined = typeof type === 'undefined';
  const isValueUndefined = typeof value === 'undefined';
  const isTypeNull = type === null;
  const isValueNull = value === null;
  const isValueObject = typeof value === 'object';
  const isTypeArray = !isTypeNull && typeof type === 'object' && type.constructor.name === 'Array';
  const isTypeRegExp = type && type.constructor.name === 'RegExp';
  const argumentsRegExp = /^\[object Arguments\]$/i;
  var valueConstructor;
  if (!isTypeDefined) return false;
  if (isTypeNull) return isValueNull;
  if (isTypeUndefined) return value === undefined;
  if (isTypeFunction) {
    if (isValueUndefined || isValueNull) return false;
    return Object.getPrototypeOf(value).constructor.name === type.name;
  }
  
  if (isTypeArray) {
    if (!type.length) return true;
    for (var t of type) {
      if (t === null && isValueNull) return true;
      if (typeof t === 'undefined' && isValueUndefined) return true;
      if (isValueNull || isValueUndefined) continue;
      if (t === null || typeof t === 'undefined') continue;
      if (Object.getPrototypeOf(value).constructor.name === t.name) return true;
    }
    return false;
  }

  if (isTypeString) {
    var typeList = type.toLowerCase().split('|');
    if ((typeList.length === 1 && typeList[0] === '') || (typeList.some((i) => i === 'any'))) return true;
    if (typeList.some((i) => i === 'truthy') && !!value) return true;
    if (typeList.some((i) => i === 'falsy') && !value) return true;
    if (isValueUndefined && typeList.some((i) => i === 'undefined')) return true;
    if (isValueNull && typeList.some((i) => i === 'null')) return true;
    if (isValueNull || value === undefined) return false;
    valueConstructor = Object.getPrototypeOf(value).constructor;
    if ((argumentsRegExp).test(value.toString()) && valueConstructor && valueConstructor.name === 'Object' && typeList.some((i) => i === 'arguments')) return true;
    if (typeList.some((i) => i === 'instance') && isValueObject && valueConstructor && valueConstructor !== _g()[valueConstructor.name]) return true;
    return typeList.some((i) => i === Object.getPrototypeOf(value).constructor.name.toLowerCase());
  }

  if (isTypeRegExp) {
    if (type.test('any') || type.test('')) return true;
    if (type.test('truthy') && !!value) return true;
    if (type.test('falsy') && !value) return true;
    if (type.test('undefined') && isValueUndefined) return true;
    if (type.test('null') && isValueNull) return true;
    if (isValueNull || value === undefined) return false;
    valueConstructor = Object.getPrototypeOf(value).constructor;
    if (type.test('arguments') && valueConstructor && valueConstructor.name === 'Object' && (argumentsRegExp).test(value.toString())) return true;
    if (type.test('instance') && isValueObject && valueConstructor && valueConstructor !== _g()[valueConstructor.name]) return true;
    return type.test(Object.getPrototypeOf(value).constructor.name);
  }
  return false;
};