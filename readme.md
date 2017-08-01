# Description

`of-type` is a very light module *(function)* that checks whether the given value is of particular type *(or types)*.

* Any bugs found? Give me to know on *dev.rafalko@gmail.com* or on [GitHub](https://github.com/devrafalko/of-type)
* Also check out [**`typeof-arguments`**](https://www.npmjs.com/package/typeof-arguments) to validate value type of the arguments passed through functions.

# Installation
`npm install of-type`

```javascript
var ofType = require('of-type');

ofType("hello world!",'string') //returns true
ofType(true,'boolean|number|string') //returns true
ofType(new Date(),/date/i) //returns true
```

# Usage

### `ofType(val,types)`
##### `val`
* the value of any type
##### `types` **[String|RegExp]**
* Checks if the **`val`** is of the **`types`** type.
* Possible values: `'null'`, `'undefined'`, or any value equal to `constructor.name`, eg. `'string'`, `'number'`, `'regexp'`, `'array'`, `'object'`, `'boolean'`,`'buffer'`, etc.
* The **`types`** [String] is case insensitive: `'String'`, `'string'`, `'StRiNg'` checks if the **`val`** is of type [String]. For **`types`** [RegExp] case insensitivity use `i` flag, eg.: `/String/`, `/string/i`, `/sTrInG/i`
* The **`types`** [String] can contain multiple allowed types, separated with `|`, eg: `'array|object'`, `'boolean|number|null|undefined'`, `string|number`. For **`types`** [RegExp] multiple values use `(x|y)` expression, eg: `/(string|number)/i`

##### Extra types:
* The **`types`** can contain the value: `'arguments'`. It returns `true` for the `arguments` Object
* The **`types`** can contain the value: `'truthy'`. It returns `true` for the **`val`** values like: `"abc"`, `true`, `1`, `{}`, `[]`,`function(){}`, etc.
* The **`types`** can contain the value: `'falsy'`. It returns `true` for the **`val`** values like: `""`, `false`, `0`, `null`, `undefined`, etc.
* The **`types`** can contain the value: `''` or `'any'`, then it returns `true` for the **`val`** of **any type**

#### Return value
The function `ofType()` returns `true` if the **`val`** is of the defined **type** or is one of the defined **types**.
The function `ofType()` returns `false` if the **`val`** is non the defined **type** or is any of the defined **types**

# Samples

```javascript
var ofType = require('of-type');

ofType("abc",'string');  //true
ofType(15,'number');  //true
ofType([1,2,3],'array');  //true
ofType([1,2,3],'object');  //false
ofType(true,'boolean');  //true
ofType(/hello/,'regexp');  //true
ofType({name:"Paul"},'object');  //true

ofType(function(){},'function');  //true
ofType((function(){return arguments;})(),'arguments');  //true
ofType((function(){return arguments;})(),'object');  //true
ofType(()=>{},'FuNcTiOn');  //true
ofType(ofType,'function');  //true

ofType(new Date(),'DATE');  //true
ofType(new Array(1,2,3),'array');  //true
ofType(new Buffer(0),'buffer');  //true
ofType(new String("abc"),'string');  //true
ofType((()=>"abc")(),'string');  //true

ofType(10,'string|number');  //true
ofType(10,'string|array');  //false
ofType(null,'undefined|null');  //true

ofType(null,'falsy');  //true
ofType(0,'falsy');  //true
ofType(undefined,'falsy');  //true
ofType("",'falsy');  //true

ofType(10,'any|string');  //true
ofType(10,'');  //true

ofType(true,'truthy');  //true
ofType("a",'truthy');  //true

ofType(new Error(),'error');  //true
ofType(new TypeError(),'typeerror');  //true
ofType(new SyntaxError(),'syntaxerror');  //true
ofType(new SyntaxError(),'error');  //false

ofType(document.createElement('DIV'),'htmldivelement');  //true
ofType(document.createElement('DIV'),'element');  //false
ofType(document.createElement('LI'),'HtmlLiElement');  //true

function Name(){};
ofType(new Name(),'Name');  //true
ofType(new Name(),'name');  //true
ofType(new Name(),'object');  //false

/*
[RegExp] samples:
*/

ofType("abc",/string/);  //false
ofType("abc",/String/);  //true
ofType("abc",/string/i);  //true
ofType(10,/string|number/i);  //true
ofType(0,/Number/);  //true
ofType(!0,/Boolean/);  //true

ofType((function(){return arguments;})(),/arguments/);  //true
ofType((function(){return arguments;})(),/object/i);  //true

ofType(123,/any/i);  //true
ofType("123",/any/i);  //true
ofType([1,2,3],/any/i);  //true

ofType(document.createElement('DIV'),/^html.*element$/i);  //true
ofType(document.createElement('DIV'),/^[a-z]+div[a-z]+$/i);  //true
ofType(document.createElement('A'),/anchor/i);  //true
ofType(document.createElement('UL'),/html[uo]listelement/i);  //true
ofType(document.createElement('OL'),/html[uo]listelement/i);  //true

ofType(null,/falsy/);  //true
ofType(0,/falsy/);  //true
ofType([1,2,3],/truthy/);  //true
ofType("",/truthy/);  //false

ofType(new SyntaxError(),/(syntax|type)error/i);  //true
ofType(new TypeError(),/(syntax|type)error/i);  //true
ofType(new Error(),/(syntax|type)error/i);  //false
```