# Description

`of-type` is a very light module *(function)* that checks whether the given value is of particular type *(or types)*.

* Any bugs found? Give me to know on [GitHub](https://github.com/devrafalko/of-type)
* Also check out [**`typeof-arguments`**](https://www.npmjs.com/package/typeof-arguments) to validate value types of the arguments passed through functions.
* Also check out [**`typeof-properties`**](https://www.npmjs.com/package/typeof-properties) to validate value types of the properties of objects.

##### v2.0 features:
* the value can be now checked with the `'instance'` or `/instance/` extra type, `function:constructor` objects, `null` or `undefined` *(or array of these items)*
* the **empty** array passed as the second argument is equal to 'any', or /any/ types. The modules function returns `true` for the values of **any** type.
* the TypeError is not throwing when the arguments passed through module function are incorrect *(missing)*. It return `false` instead.
* tests added

# Installation
`npm install of-type`

```javascript
var ofType = require('of-type');

ofType("hello world!",'string') //returns true
ofType(true,'boolean|number|string') //returns true
ofType(new Date(),/date/i) //returns true
```

# Usage

### `ofType(val,type)`
##### `val`
* the value of any type

##### `type` **[String|RegExp|null|undefined|Function|Array]**
* Checks if the **`val`** is of the **`type`** type.

###### `type` [String]

* Possible values: `'null'`, `'undefined'`, or any value equal to **`constructor.name`**, eg: `'string'`, `'number'`, `'regexp'`, `'array'`, `'object'`, `'boolean'`,`'buffer'`, etc.
* The **`type`** [String] is case insensitive: `'String'`, `'string'`, `'StRiNg'` checks if the **`val`** is of type [String].
* The **`type`** [String] can contain multiple allowed types, separated with `|`. eg: `'array|object'` checks if the **`val`** is of type [Array] **`OR`** of type [Object].

###### `type` [RegExp]
* Possible values: `/null/`, `/undefined/`, or any value matching the `constructor.name`, eg: `/String/`, `/Number/`, `/RegExp/`, `/Array/`, `/Object/`, `/Boolean/`,`/Buffer/`, `/Promise/`, etc.
* For the case insensitivity use `i` flag, eg: `/string/i`, `/regexp/i`, `/typeerror/i`
* For multiple values use regexp `(x|y)` expression, eg: `/String|Number/`, `/TypeError|Error/`

###### `type` [null|undefined|Function|Array]
* Possible values: `null`, `undefined` or any constructor, eg: `String`, `TypeError`, `Promise`, `Array`, etc.
* For multiple values use array, eg: `[String,Object,Array,null]`

> When you use **bundlers** or **minifiers**, use [String|RegExp] `type` **wisely** as bundlers may change the names of functions/constructors/classes in the output file and `type(myInstance,"MyClass")` that returns `true` before compilation, may return `false` after compilation, if the bundler minifies the `MyClass` constructor name.

##### Extra types:
* The **`type`** can contain the value: `'arguments'` or `/arguments/`. It returns `true` for the `arguments` Object
* The **`type`** can contain the value : `'instance'` or `/instance/`. It returns `true` for the instances of **user classes** or **constructors**. It returns `false` for instances of **built-in** *(native)* constructors, eg. for `[]`, `"hello world"`, `{}`
* The **`type`** can contain the value: `'truthy'` or `/truthy/`. It returns `true` for the **`val`** values like: `"abc"`, `true`, `1`, `{}`, `[]`,`function(){}`, etc.
* The **`type`** can contain the value: `'falsy'` or `/falsy/`. It returns `true` for the **`val`** values like: `""`, `false`, `0`, `null`, `undefined`, `NaN`, etc.
* The **`type`** can contain the value: `''` or `[]` or `'any'` or `/any/`, It returns `true` for the **`val`** values of **any type**

#### Return value
The function `ofType()` returns `true` if the **`val`** is of the defined **type** or is one of the defined **types**.  
The function `ofType()` returns `false` if the **`val`** is not of the defined **type** or is none of the defined **types**

# Tips
> missing the `val` or `type` parameter will always return false *(without throwing errors)*  
`ofType()`  //false  
`ofType(undefined,undefined)`  //true  
`ofType(undefined)`  //false

# Tests
```
> git clone https://github.com/devrafalko/of-type.git
> cd of-type
> npm install
> npm test
> npm run test-err //additionally displays error descriptions (when occur)
```

# Samples

##### for `types` [String]
```javascript
var ofType = require('of-type');

ofType("hello world",'string');  //true
ofType(10,'number');  //true
ofType([1,2,3],'array');  //true
ofType([1,2,3],'object');  //false
ofType(true,'boolean');  //true
ofType(/hello/,'regexp');  //true
ofType({name:"Paul"},'object');  //true
ofType({name:"Paul"},'instance'); //false
ofType({name:"Paul"},'instance'); //false
ofType([1,2,3],'function');  //true

ofType((function(){return arguments;})(),'arguments');  //true
ofType((function(){return arguments;})(),'object');  //true, MIND that the Object is the constructor
ofType(()=>{},'FuNcTiOn');  //true
ofType(ofType,'function');  //true

ofType(new Date(),'DATE');  //true
ofType(new Array(1,2,3),'array');  //true
ofType(new Buffer(0),'buffer');  //true
ofType(new String("abc"),'string');  //true
ofType((()=>"abc")(),'string');  //true

ofType(Date,'date');  //false
ofType(Date,'function');  //true
ofType(Array,'function');  //true
ofType(Array,'instance');  //false

ofType(10,'string|number');  //true
ofType(10,'string|array');  //false
ofType(null,'undefined|null');  //true

ofType("",'falsy');  //true
ofType(0,'falsy');  //true
ofType(null,'falsy');  //true
ofType(undefined,'falsy');  //true

ofType(10,'any|string');  //true
ofType("hello world",'');  //true
ofType(false,'any');  //true

ofType(true,'truthy');  //true
ofType("hello world",'truthy');  //true
ofType("",'truthy');  //false
ofType(new String(""),'truthy')  //true
ofType(new String("").valueOf(),'truthy')  //false
ofType([1,2,3],'truthy') //true
ofType([],'truthy') //true

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
ofType(new Name(),'object');  //false, MIND that this is not the instance of Object constructor
ofType(new Name(),'instance') //true

```

##### for `types` [RegExp]
```javascript
var ofType = require('of-type');

ofType("hello",/string/);  //false
ofType("hello",/String/);  //true
ofType("hello",/string/i);  //true
ofType(10,/string|number/i);  //true
ofType(0,/Number/);  //true
ofType(!0,/Boolean/);  //true

ofType((function(){return arguments;})(),/arguments/);  //true
ofType((function(){return arguments;})(),/arg/);  //true
ofType((function(){return arguments;})(),/object/i);  //true

ofType(123,/any/);  //true
ofType("123",/ANY/i);  //true
ofType([1,2,3],/any/);  //true

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

function Name(){};
ofType(new Name(),/Name/);  //true
ofType(new Name(),/name/);  //false
ofType(new Name(),/name/i);  //true
ofType(new Name(),/Object/);  //false, MIND that this is not the instance of Object constructor
ofType(new Name(),/instance/) //true
```

##### for `types` [Function|null|undefined] and [Array\<Function|null|undefined\>]
```javascript
var ofType = require('of-type');

ofType("hello",String);  //true
ofType("hello",Number);  //false
ofType("hello",[String,Number]);  //true
ofType(10,Number);  //true
ofType(false,Boolean);  //true
ofType([1,2,3],Object);  //false
ofType([1,2,3],Array);  //true
ofType(Array,Array);  //false
ofType(Array,Function);  //true

ofType(null,[]);  //true
ofType("hello world",[]);  //true
ofType(Number,[]);  //true
ofType(0,[]);  //true
ofType(new Date(),[]);  //true

ofType(null,null);  //true
ofType(undefined,null);  //false
ofType(false,null);  //false

ofType({}.name,undefined);  //true
ofType(undefined,undefined);  //true
ofType(null,undefined);  //false

ofType(new RangeError('error'),Error);  //false
ofType(new RangeError('error'),[Error,TypeError,RangeError]);  //true
```