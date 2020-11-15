# node-utilify
Utility for your node JS application.

[![Build Status](https://travis-ci.com/siddhesh321995/node-utilify.svg?branch=main)](https://travis-ci.com/siddhesh321995/node-utilify)
![Node.js CI](https://github.com/siddhesh321995/node-utilify/workflows/Node.js%20CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/siddhesh321995/node-utilify/badge.svg?branch=main)](https://coveralls.io/github/siddhesh321995/node-utilify?branch=main)

## Installation:

```
npm install node-utilify --save
```


Setup your Mongo Driver
```
const Utilify = require('node-utilify');

Utilify.isArray([]); // true
```

## Recent addition in the library
- EventManager: Custom event manager.

## Some sample functions
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
const defaultsFnc = Utilify.CacheMgr.set('key1', 10);
console.log(Utilify.CacheMgr.get('key1')); // 10
Utilify.CacheMgr.remove('key1');
console.log(Utilify.CacheMgr.get('key1')); // undefined
```

## Complete Documentation
[Click here](DOCUMENTATION.md) to checkout complete documentation or View Documentation page [here](https://siddhesh321995.github.io/node-utilify/)

## Features:
- Data type check functions.
- EnumGenerator, defaultsGenerator functions.
- 0 Dependancy.

## Help us expand:
Let me know in issues/github page or on email which javascript functions to include in next release.
