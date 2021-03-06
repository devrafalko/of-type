const _g = (function () { return global || window; }).bind(this);

class OfType {
  constructor(){
    const _this = this;
    return function ofType(value, type){
      _this._setInitials(arguments, value, type);
      return _this._validate();
    };
  }

  get isTypeDefined(){
    return this._arguments.length >= 2;
  }

  get isTypeString(){
    return typeof this._type === 'string';
  }
  
  get isTypeFunction(){
    return typeof this._type === 'function';
  }

  get isTypeUndefined(){
    return typeof this._type === 'undefined';
  }

  get isValueUndefined(){
    return typeof this._value === 'undefined';
  }

  get isTypeNull(){
    return this._type === null;
  }

  get isValueNull(){
    return this._value === null;
  }

  get isValueObject(){
    return typeof this._value === 'object';
  }

  get isObjectInstance(){
    return this._value instanceof Object;
  }

  get isTypeArray(){
    return !this.isTypeNull && typeof this._type === 'object' && this._type.constructor === Array;
  }

  get isTypeRegExp(){
    return this._type && this._type.constructor === RegExp;
  }

  get argumentsRegExp(){
    return /^\[object Arguments\]$/i;
  }

  _setInitials(_arguments, value, type){
    this._arguments = _arguments;
    this._value = value;
    this._type = type;
  }

  _validate(){
    if (!this.isTypeDefined) return false;
    if (this.isTypeNull) return this.isValueNull;
    if (this.isTypeUndefined) return this._value === undefined;
    if (this.isTypeFunction) return this._typeConstructor();
    if (this.isTypeArray) return this._typeArray();
    if (this.isTypeString) return this._typeString();
    if (this.isTypeRegExp) return this._typeRegexp();
    return false;
  }

  _typeConstructor(){
    if (this.isValueUndefined || this.isValueNull) return false;
    return Object.getPrototypeOf(this._value).constructor === this._type;
  }

  _typeArray(){
    if (!this._type.length) return true;
    for (let t of this._type) {
      if (t === null && this.isValueNull) return true;
      if (typeof t === 'undefined' && this.isValueUndefined) return true;
      if (this.isValueNull || this.isValueUndefined) continue;
      if (t === null || typeof t === 'undefined') continue;
      if (Object.getPrototypeOf(this._value).constructor === t) return true;
    }
    return false;
  }

  _typeString(){
    const typeList = this._type.toLowerCase().split('|');
    if ((typeList.length === 1 && typeList[0] === '') || (typeList.some((i) => i === 'any'))) return true;
    if (typeList.some((i) => i === 'truthy') && !!this._value) return true;
    if (typeList.some((i) => i === 'falsy') && !this._value) return true;
    if (this.isValueUndefined && typeList.some((i) => i === 'undefined')) return true;
    if (this.isValueNull && typeList.some((i) => i === 'null')) return true;
    if (this.isValueNull || this._value === undefined) return false;
    const valueConstructor = Object.getPrototypeOf(this._value).constructor;
    if ((this.argumentsRegExp).test(this._value.toString()) && valueConstructor && valueConstructor === Object && typeList.some((i) => i === 'arguments')) return true;
    if (typeList.some((i) => i === 'instance') && this.isValueObject && valueConstructor && valueConstructor !== _g()[valueConstructor.name]) return true;
    if (typeList.some((i) => i === 'objectable') && this.isObjectInstance) return true;
    return typeList.some((i) => i === Object.getPrototypeOf(this._value).constructor.name.toLowerCase());
  }

  _typeRegexp(){
    if (this._exec('any') || this._type.test('')) return true;
    if (this._exec('truthy') && !!this._value) return true;
    if (this._exec('falsy') && !this._value) return true;
    if (this._type.test('undefined') && this.isValueUndefined) return true;
    if (this._type.test('null') && this.isValueNull) return true;
    if (this.isValueNull || this._value === undefined) return false;
    const valueConstructor = Object.getPrototypeOf(this._value).constructor;
    if (this._exec('arguments') && valueConstructor && valueConstructor === Object && (this.argumentsRegExp).test(this._value.toString())) return true;
    if (this._exec('instance') && this.isValueObject && valueConstructor && valueConstructor !== _g()[valueConstructor.name]) return true;
    if (this._exec('objectable') && this.isObjectInstance) return true;
    return this._type.test(Object.getPrototypeOf(this._value).constructor.name);
  }
  
  _exec(name){
    let _exec = this._type.exec(name);
    return _exec !== null && _exec[0] === name;
  }
}

export default new OfType();