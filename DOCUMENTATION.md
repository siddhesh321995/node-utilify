### Table of Contents

-   [UUID_NIL][1]
-   [EnumGenerator][2]
    -   [Parameters][3]
-   [getCurrentEpochTime][4]
-   [CacheMgr][5]
    -   [set][6]
        -   [Parameters][7]
    -   [get][8]
        -   [Parameters][9]
    -   [remove][10]
        -   [Parameters][11]
    -   [clearAll][12]
-   [copy][13]
    -   [Parameters][14]
-   [deepCopy][15]
    -   [Parameters][16]
-   [clone][17]
    -   [Parameters][18]
-   [defaultsGenerator][19]
    -   [Parameters][20]
-   [EventManager][21]
    -   [listenTo][22]
        -   [Parameters][23]
    -   [once][24]
        -   [Parameters][25]
    -   [trigger][26]
        -   [Parameters][27]
    -   [off][28]
        -   [Parameters][29]
-   [isNumber][30]
    -   [Parameters][31]
-   [isFunction][32]
    -   [Parameters][33]
-   [isString][34]
    -   [Parameters][35]
-   [isBoolean][36]
    -   [Parameters][37]
-   [isArray][38]
    -   [Parameters][39]
-   [argumentsToArray][40]
    -   [Parameters][41]
-   [removeDuplicates][42]
    -   [Parameters][43]

## UUID_NIL

Null value for uuid

Type: [string][44]

## EnumGenerator

Generates a Enum class

### Parameters

-   `attr`

## getCurrentEpochTime

Returns current epoch time in int.

## CacheMgr

Cache manager, stores data in memory.

### set

Sets cache value

#### Parameters

-   `key` **[string][44]** Key of the value
-   `val` **any** Cached value

### get

Gets cached value

#### Parameters

-   `key` **[string][44]** Key of the value

### remove

Removes given cached value

#### Parameters

-   `key` **[string][44]** Key of the value

### clearAll

Removes all cached values.

## copy

Copies all properties from data to copy object.

### Parameters

-   `copy` **any** Target object.
-   `data` **any** Source object.

## deepCopy

Deep clones all properties from data to copy object.

### Parameters

-   `copy` **any** Target object.
-   `data` **any** Source object.

## clone

Returns clonned object from given object

### Parameters

-   `data` **any** Source object.

## defaultsGenerator

Generator function for defaults in a class constructor.

### Parameters

-   `attr` **any** Default Object attribute (optional, default `{}`)

## EventManager

Custom event manager.
Scope based.

Returns **Class** A static class / namespace

### listenTo

Adds an event listener on given context with given event name and callback.

#### Parameters

-   `context` **[Object][45]** The context
-   `eventName` **[string][44]** The event name
-   `callback` **[Function][46]** The callback

### once

Adds an event listener on given context with given event name and callback but removes when once executed.

#### Parameters

-   `context` **[Object][45]** The context
-   `eventName` **[string][44]** The event name
-   `callback` **[Function][46]** The callback

### trigger

Triggers given event on given context with data.

#### Parameters

-   `context` **[Object][45]** The context
-   `eventName` **[string][44]** The event name
-   `data` **ANY** The data

### off

Removes an event listener if no callback provided, all events will be removed on context with given event.

#### Parameters

-   `context` **[Object][45]** The context
-   `eventName` **[string][44]** The event name
-   `callback` **[Function][46]** The callback (optional)

## isNumber

Returns true if parameter is number.

### Parameters

-   `item` **any** parameter to check.

## isFunction

Returns true if parameter is function.

### Parameters

-   `item` **any** parameter to check.

## isString

Returns true if parameter is string.

### Parameters

-   `item` **any** parameter to check.

## isBoolean

Returns true if parameter is boolean.

### Parameters

-   `item` **any** parameter to check.

## isArray

Returns true if parameter is an array.

### Parameters

-   `item` **any** parameter to check.

## argumentsToArray

Converts type arguments into array, with same values

### Parameters

-   `args` **argument** The arguments

Returns **[Array][47]&lt;any>** Array type arguments

## removeDuplicates

Removes duplicates elements in array.

### Parameters

-   `arr` **[Array][47]&lt;any>** Array with duplicate items

Returns **[Array][47]&lt;any>** Array without duplicate items.

[1]: #uuid_nil

[2]: #enumgenerator

[3]: #parameters

[4]: #getcurrentepochtime

[5]: #cachemgr

[6]: #set

[7]: #parameters-1

[8]: #get

[9]: #parameters-2

[10]: #remove

[11]: #parameters-3

[12]: #clearall

[13]: #copy

[14]: #parameters-4

[15]: #deepcopy

[16]: #parameters-5

[17]: #clone

[18]: #parameters-6

[19]: #defaultsgenerator

[20]: #parameters-7

[21]: #eventmanager

[22]: #listento

[23]: #parameters-8

[24]: #once

[25]: #parameters-9

[26]: #trigger

[27]: #parameters-10

[28]: #off

[29]: #parameters-11

[30]: #isnumber

[31]: #parameters-12

[32]: #isfunction

[33]: #parameters-13

[34]: #isstring

[35]: #parameters-14

[36]: #isboolean

[37]: #parameters-15

[38]: #isarray

[39]: #parameters-16

[40]: #argumentstoarray

[41]: #parameters-17

[42]: #removeduplicates

[43]: #parameters-18

[44]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[45]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[46]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[47]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array