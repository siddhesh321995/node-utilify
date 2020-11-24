# node-utilify
Utility for your node JS application.

[![Build Status](https://travis-ci.com/siddhesh321995/node-utilify.svg?branch=main)](https://travis-ci.com/siddhesh321995/node-utilify)
![Node.js CI](https://github.com/siddhesh321995/node-utilify/workflows/Node.js%20CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/siddhesh321995/node-utilify/badge.svg?branch=main)](https://coveralls.io/github/siddhesh321995/node-utilify?branch=main)

## Installation:
Using npm
```
npm install node-utilify --save
```
Or directly on your browser, simply download your file from the following:
- [utilify.js](dist/utilify.js) Development version
- [utilify.min.js](dist/utilify.min.js) Deployment version
```
<script type="application/javascript" src="utilify.js"></script>
<script type="application/javascript" src="utilify.min.js"></script>
```
## Recent features added in the library
- Ajax: XHR wrapper for frontend.
- EventManager: Custom event manager.

## Some sample utility functions
```
const Utilify = require('node-utilify');
```
```
Utilify.isArray([]); // true
```
```
const httpStatusCodes = Utilify.EnumGenerator({505:'Internal Server Error',404: 'Not Found'});

console.log(httpStatusCodes[505]); // 'Internal Server Error'
console.log(httpStatusCodes['Internal Server Error']); // 505
```
```
console.log(Utilify.getCurrentEpochTime()); // 1605467433
```
```
const defaultsFnc = Utilify.defaultsGenerator({id:1,name:'Sidd'});
console.log(defaultsFnc({name:'JS'})); // {id:1,name:'JS'}
```
```
Utilify.CacheMgr.set('key1', 10);
console.log(Utilify.CacheMgr.get('key1')); // 10
Utilify.CacheMgr.remove('key1');
console.log(Utilify.CacheMgr.get('key1')); // undefined
```
```
Utilify.Ajax.post('https://reqres.in/api/users', {
    name: "paul rudd",
    movies: ["Role Models"]
}).then(console.log).catch(console.warn);
```

## Complete Documentation
Checkout [DOCUMENTATION.md](DOCUMENTATION.md) for complete documentation or View Documentation online at [https://siddhesh321995.github.io/node-utilify/](https://siddhesh321995.github.io/node-utilify/)

## All Features:
- Data type check functions.
- Frontend XHR wrapper.
- EnumGenerator, defaultsGenerator functions.
- 0 Dependancy.

## Help us expand:
Let me know in issues/github page or on email which javascript functions to include in next release.
Check all the [Contributors](Contributors.md) to this library.