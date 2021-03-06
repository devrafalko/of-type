# Description

`of-type` is a very light module that checks if the given value is of the expected type *(or types)*.

Also see [`typeof-arguments`](https://www.npmjs.com/package/typeof-arguments) to validate types of the arguments passed through functions.  
Also see [`typeof-properties`](https://www.npmjs.com/package/typeof-properties) to validate types of the objects' properties.

# Implementation

#### with NodeJS
`npm install of-type`

```javascript
const type = require('of-type');

type('hello world!', 'string'); //true
type(true, 'boolean|number|string'); //true
type(new Date(), /date/i); //true
```

#### with Browser

#### Add `of-type.js` library to the HTML file.
The library is located in `./dist/of-type.js` directory.  
It is a webpack&babel bundled cross-browser library version.  
The library is accessible as `ofType` variable in the global *(window)* scope.

```html
<head>
  <script src='of-type.js'></script>
  <script>
    ofType('hello world!', 'string'); //true
  </script>
</head>
```

# Tests
```
> git clone https://github.com/devrafalko/of-type.git
> cd of-type
> npm install
> npm test        //run tests in node
> npm test deep   //run tests in node with errors shown
```

# Usage

### `type(val, type)`

#### `val`
It is any value|object which type should be checked.

#### `type` **[String|RegExp|null|undefined|Function|Array]**
The `val` value|object is expected to be of `type` type. There are many ways to check the `val` type. Choose the most convenient one:  
  
`[String]`
* Possible values:  
  * `'null'`, `'undefined'`  
  * any value that equals to `val`.`constructor.name`, eg:  
  `'string'`, `'number'`, `'regexp'`, `'array'`, `'object'`, `'boolean'`,`'buffer'`, etc.
* The [String] `type` is case insensitive:
  * `'String'`, `'string'`, `'StRiNg'` checks if the `val` is of `[String]` type
  * `'RegExp'`, `'REGEXP'`, `'regexp'` checks if the `val` is of `[RegExp]` type
* The [String] `type` can contain multiple types, separated with `|`:
  * `'array|object'` checks if the `val` is of `[Array]` **`OR`** `[Object]` type
  * `'undefined|null'` checks if the `val` is of `undefined` **`OR`** `null` type
* See the [samples](#string-type)

`[RegExp]`
* Possible values: 
  * `/null/`, `/undefined/`
  * any value matching the `val`.`constructor.name`, eg: `/String/`, `/Number/`, `/RegExp/`, `/Array/`, `/Object/`, `/Boolean/`,`/Buffer/`, `/Promise/`, etc.
* Use all regular expression's features to match the type in a desired way:
  * `/Str/`, `/Err/`, `/Reg/`, `/B/`
  * `/.+Error$/`, `/^RegExp$/`, 
  * `/^[A-Z][a-z]+$/`
* For the case insensitivity use `i` flag:
  * `/string/i`, `/regexp/i`, `/TYPEERROR/i`
* For multiple values use regexp `(x|y)` expression:
  * `/String|Number/`, `/TypeError|Error/`, `/(obj|str)/i`
* See the [samples](#regexp-type)

`[Function|Array|null|undefined]`
* Possible values:
  * `null`, `undefined`
  * any `[Function]` constructor, eg: `String`, `TypeError`, `Promise`, `Array`, etc.
* For multiple values use array:
  * `[String, Object, Array, null]`
  * `[null, undefined, Boolean]`
* See the [samples](#constructor-null-and-undefined)

> When you use **bundlers** or **minifiers**, use `[String|RegExp]` `type` **wisely** as bundlers may change the names of functions|constructors|classes in the output file and eg. `type(myInstance, 'MyClass')` that returns `true` before compilation, may return `false` after compilation, if the bundler minifies the `'MyClass'` constructor name.

### Extra types:

`[String] 'arguments'` | `[RegExp] /arguments/`

* The `type` `'arguments'` or `/arguments/` returns `true` for the function's `arguments` object
* See the [samples](#arguments-type)

`[String] 'instance'` | `[RegExp] /instance/`
* The `type` `'instance'` or `/instance/` returns `true` for the instance of the user's class|constructor
  * `type(MyInstance, 'instance'); //true`
* It returns `false` for instances of built-in *(native)* constructors
  * `[]`, `'hello world'`, `{}`
* It returns `false` for instances that are the `global`|`window`'s properties
* See the [samples](#instance-type)

`[String] 'objectable'` | `[RegExp] /objectable/`
* The `type` `'objectable'` or `/objectable/` returns `true` for the objects that are the instances of `Object` constructor
  * `{}`, `[]`, `new String('hello world')`, `new Boolean(1)`
* It returns `false` for the primitive values and simple values
  * `'hello world'`, `true`, `10`, `null`, `undefined`
* See the [samples](#objectable-type)

`[String] 'truthy'` | `[RegExp] /truthy/`
* The `type` `'truthy'` or `/truthy/` returns `true` for the values like:
  * `'abc'`, `true`, `1`, `-1`, `{}`, `[]`, `function(){}`
* See the [samples](#truthy-type)

`[String] 'falsy'` | `[RegExp] /falsy/`
* The `type` `'falsy'` or `/falsy/` returns `true` for the values like:
  * `''`, `false`, `0`, `null`, `undefined`, `NaN`
* See the [samples](#falsy-type)

`[String] 'any'` | `[RegExp] /any/` | `[Array] []` | `[String] ""`
* The `type` `'any'` or `/any/` or empty array `[]` or empty string `""` returns `true` for the values of any type
* See the [samples](#any-type)

### Return value
The function `type()` returns `true` if the `val` argument is of expected `type`.  
The function `type()` returns `false` if the `val` argument is not of expected `type`.

# Tips
> Missing the `val` or `type` arguments will always return `false` *(without throwing error)*. 
```javascript 
type(); //false  
type(undefined, undefined); //true  
type(undefined); //false
```
# Samples

### `[String]` `type`
```javascript
import type from `of-type`;

type('hello world', 'String'); //true
type(10, 'Number'); //true
type(null, 'null'); //true
type(undefined, 'undefined'); //true
type([1,2,3], 'Array'); //true
type([1,2,3], 'Object'); //false
type(true, 'Boolean'); //true
type(type, 'function'); //true
type(/hello/, 'RegExp'); //true
type({ framework: 'React' }, 'Object'); //true

type('hello world', 'string'); //true
type('hello world', 'STRING'); //true
type('hello world', 'str'); //false
type(true, 'BOOLEAN'); //true
type(false, 'BoOlEaN'); //true
type(false, 'Bool'); //false
type(null, 'NULL'); //true

type(new Date(), 'DATE'); //true
type(new Array(1,2,3), 'array'); //true
type(new Buffer(0), 'buffer'); //true
type(new String('hello world'), 'string'); //true

type(()=>{}, 'function'); //true
type((()=>'hello world')(), 'string'); //true

type(Date, 'date'); //false
type(Date, 'function'); //true
type(Array, 'Function'); //true

type(new Error(), 'error'); //true
type(new TypeError(), 'typeerror'); //true
type(new SyntaxError(), 'syntaxerror'); //true
type(new SyntaxError(), 'error'); //false

type(document.createElement('DIV'), 'htmldivelement'); //true
type(document.createElement('DIV'), 'element'); //false
type(document.createElement('LI'), 'HtmlLiElement'); //true

type((function(){ return arguments; })(), 'object'); //true; constructor.name === "Object"

class Name{};
type(new Name(), 'Name'); //true
type(new Name(), 'name'); //true
type(new Name(), 'object'); //false; constructor.name === 'Name'

type(10, 'string|number'); //true
type(10, 'string|array'); //false
type(null, 'undefined|null'); //true
```

### `[RegExp]` `type`
```javascript
import type from `of-type`;

type('hello world', /String/); //true
type(10, /Number/); //true
type(null, /null/); //true
type(undefined, /undefined/); //true
type([1,2,3], /Array/); //true
type([1,2,3], /Object/); //false
type(true, /Boolean/); //true
type(type, /Function/); //true
type(/hello/, /RegExp/); //true
type({ framework: 'React' }, /Object/); //true

type('hello world', /string/); //false
type('hello world', /STRING/); //false
type('hello world', /string/i); //true
type('hello world', /STRING/i); //true
type('hello world', /Str/); //true
type('hello world', /^str/i); //true
type(true, /BOOLEAN/); //false
type(false, /BoOlEaN/); //false
type(true, /BOOLEAN/i); //true
type(false, /BoOlEaN/i); //true
type(false, /Bool/); //true
type(false, /bool/i); //true
type(null, /NULL/); //false
type(null, /NULL/i); //true

type({}, /^[A-Z][a-z]+$/); //true
type(true, /^[A-Z][a-z]+$/); //true
type(null, /^[A-Z][a-z]+$/); //false
type(undefined, /^[A-Z][a-z]+$/); //false

type((function(){ return arguments; })(), /object/i); //true; constructor.name === "Object"

type(document.createElement('DIV'), /^html.*element$/i); //true
type(document.createElement('DIV'), /^[a-z]+div[a-z]+$/i); //true
type(document.createElement('A'), /anchor/i); //true
type(document.createElement('UL'), /html[uo]listelement/i); //true
type(document.createElement('OL'), /html[uo]listelement/i); //true

type(10, /string|number/i); //true
type(undefined, /und|null/i); //true
type(new SyntaxError(), /(syntax|type)error/i); //true
type(new TypeError(), /(syntax|type)error/i); //true
type(new Error(), /(syntax|type)?error/i); //true

class Name(){};
type(new Name(), /Name/); //true
type(new Name(), /name/); //false
type(new Name(), /name/i); //true
type(new Name(), /Object/); //false; constructor.name === 'Name'
```

### `constructor`, `null` and `undefined`
```javascript
import type from `of-type`;

type('hello world', String); //true
type(10, Number); //true
type(null, null); //true
type(undefined, undefined); //true
type(null, undefined); //false
type({}.name, undefined); //true
type([1,2,3], Array); //true
type([1,2,3], Object); //false
type(true, Boolean); //true
type(type, Function); //true
type(/hello/, RegExp); //true
type({ framework: 'React' }, Object); //true
type((function(){ return arguments; })(), Object); //true; constructor.name === "Object"

type(new Date(), Date); //true
type(new Array(1,2,3), Array); //true
type(new Buffer(0), Buffer); //true
type(new String('hello world'), String); //true

type(()=>{}, Function); //true
type((()=>'hello world')(), String); //true

type(Date, Date); //false
type(Date, Function); //true
type(Array, Function); //true

type(new Error(), Error); //true
type(new TypeError(), TypeError); //true
type(new SyntaxError(), SyntaxError); //true
type(new SyntaxError(), Error); //false
type(new RangeError(), [Error, TypeError, RangeError]); //true

class Name{};
type(new Name(), Name); //true
type(new Name(), Object); //false; constructor.name === 'Name'

type(10, [String, Number]); //true
type(10, [String, Array]); //false
type(null, [undefined, null]); //true
```

### `arguments` type
```javascript
import type from `of-type`;

function hello(){
  return arguments;
}

type(hello(), 'arguments'); //true
type(hello(), 'ARGUMENTS'); //true
type(hello(), 'arg'); //false
type(hello(), /arguments/); //true
type(hello(), /ARGUMENTS/); //false
type(hello(), /ARGUMENTS/i); //true
type(hello(), /arg/); //false

type(hello(), 'arguments|object|instance'); //true
type(hello(), /arguments|undefined/); //true
```

### `instance` type
```javascript
import type from `of-type`;

class Name{ }

type(new Name(), 'instance'); //true
type(new Name(), 'INSTANCE'); //true
type(new Name(), 'inst'); //false
type(new Name(), /instance/); //true
type(new Name(), /INSTANCE/); //false
type(new Name(), /INSTANCE/i); //true
type(new Name(), /inst/); //false

type({}, 'instance'); //false
type([], 'instance'); //false
type(Array, 'instance'); //false
type(new Error(), /instance/); //false
type('hello world', /instance/) //false

global.Framework = class Framework{ };
window.Cars = class Cars{ };

type(new Framework(), 'instance'); //false
type(new Framework(), /instance/); //false
type(new Cars(), 'instance'); //false
type(new Cars(), /instance/); //false

type({}, 'instance|object'); //true
type(new String(), /instance|objectable/); //true
```

### `objectable` type
```javascript
import type from `of-type`;
type('hello world', 'objectable'); //false
type(10, 'objectable'); //false
type(null, 'objectable'); //false
type(undefined, 'objectable'); //false
type(true, 'objectable'); //false
type({}, 'objectable'); //true
type({}.name, 'objectable'); //false
type([1,2,3], 'objectable'); //true
type(/hello/, 'objectable'); //true
type(type, 'objectable'); //true
type((function(){ return arguments; })(), 'objectable'); //true; (arguments instanceof Object) === true

class Name{}
type(new Name(), 'objectable'); //true
type(new String('hello world'), 'objectable'); //true
type(new Number(10), 'objectable'); //true
type(new Error(), 'objectable'); //true

type({}, 'objectable'); //true
type({}, 'OBJECTABLE'); //true
type({}, 'obj'); //false
type({}, /objectable/); //true
type({}, /OBJECTABLE/); //false
type({}, /OBJECTABLE/i); //true
type({}, /objecta/); //false; as it's unrecognizable custom type
type({}, /obj/i); //true; as it still matches constructor.name === 'Object'

type(0, 'objectable|falsy'); //true
type('hello world', /objectable|string/i); //true
type({}, /object(able)?/i); //true
type([], /object(able)?/i); //true
```

### `truthy` type
```javascript
import type from `of-type`;

type('hello world', 'truthy'); //true
type('', 'truthy'); //false
type(new String(''), 'truthy'); //true
type(new String('').valueOf(), 'truthy');  //false
type(10, 'truthy'); //true
type(0, 'truthy'); //false
type(null, 'truthy'); //false
type(undefined, 'truthy'); //false
type([1,2,3], 'truthy'); //true
type([], 'truthy'); //true
type(true, 'truthy'); //true
type(false, 'truthy'); //false
type(type, 'truthy'); //true
type(/hello/, 'truthy'); //true
type({ framework: 'React' }, 'truthy'); //true
type({}.name, 'truthy'); //false

type(true, 'truthy'); //true
type(true, 'TRUTHY'); //true
type(true, 'tru'); //false
type(true, /truthy/); //true
type(true, /TRUTHY/); //false
type(true, /TRUTHY/i); //true
type(true, /tru/); //false; as it's unrecognizable custom type

type(undefined, 'truthy|null'); //false
type(0, 'truthy|number'); //true
type(false, /truthy|Boolean/); //true
```

### `falsy` type
```javascript
import type from `of-type`;
type('hello world', 'falsy'); //false
type('', 'falsy'); //true
type(new String(''), 'falsy'); //false
type(new String('').valueOf(), 'falsy');  //true
type(10, 'falsy'); //false
type(0, 'falsy'); //true
type(null, 'falsy'); //true
type(undefined, 'falsy'); //true
type([1,2,3], 'falsy'); //false
type([], 'falsy'); //false
type(true, 'falsy'); //false
type(false, 'falsy'); //true
type(type, 'falsy'); //false
type(/hello/, 'falsy'); //false
type({ framework: 'React' }, 'falsy'); //false
type({}.name, 'falsy'); //true

type(false, 'falsy'); //true
type(false, 'FALSY'); //true
type(false, 'fal'); //false
type(false, /falsy/); //true
type(false, /FALSY/); //false
type(false, /FALSY/i); //true
type(false, /fal/); //false; as it's unrecognizable custom type

type([], 'falsy|objectable'); //true
type(10, 'falsy|number'); //true
type(true, /falsy|Boolean/); //true
```

### `any` type
```javascript
import type from `of-type`;

type('hello world', 'any'); //true
type('', 'any'); //true
type(new String(''), 'any'); //true
type(10, 'any'); //true
type(0, /any/); //true
type(null, /any/); //true
type(undefined, /any/); //true
type([1,2,3], /any/); //true
type([], []); //true
type(true, []); //true
type(false, []); //true
type(type, []); //true
type(/hello/, ''); //true
type({ framework: 'React' }, ''); //true
type({}.name, ''); //true

type({}, 'any'); //true
type({}, 'ANY'); //true
type({}, 'an'); //false
type({}, /any/); //true
type({}, /ANY/); //false
type({}, /ANY/i); //true
type({}, /an/); //false; as it's unrecognizable custom type
```