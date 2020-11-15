### Table of Contents

-   [EnumGenerator][1]
    -   [Parameters][2]
-   [getCurrentEpochTime][3]
-   [CacheMgr][4]
    -   [set][5]
        -   [Parameters][6]
    -   [get][7]
        -   [Parameters][8]
    -   [remove][9]
        -   [Parameters][10]
    -   [clearAll][11]
-   [copy][12]
    -   [Parameters][13]
-   [deepCopy][14]
    -   [Parameters][15]
-   [defaultsGenerator][16]
    -   [Parameters][17]
-   [EventManager][18]
    -   [listenTo][19]
        -   [Parameters][20]
    -   [once][21]
        -   [Parameters][22]
    -   [trigger][23]
        -   [Parameters][24]
    -   [off][25]
        -   [Parameters][26]
-   [argumentsToArray][27]
    -   [Parameters][28]
-   [removeDuplicates][29]
    -   [Parameters][30]

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

-   `key` **[string][31]** Key of the value
-   `val` **any** Cached value

### get

Gets cached value

#### Parameters

-   `key` **[string][31]** Key of the value

### remove

Removes given cached value

#### Parameters

-   `key` **[string][31]** Key of the value

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

## defaultsGenerator

Generator function for defaults in a class constructor.

### Parameters

-   `attr` **any** Default Object attribute (optional, default `{}`)

## EventManager

Manges events.

Returns **Class** A static class / namespace

### listenTo

Adds an event listener on given context with given event name and callback.

#### Parameters

-   `context` **[Object][32]** The context
-   `eventName` **[string][31]** The event name
-   `callback` **[Function][33]** The callback

### once

Adds an event listener on given context with given event name and callback but removes when once executed.

#### Parameters

-   `context` **[Object][32]** The context
-   `eventName` **[string][31]** The event name
-   `callback` **[Function][33]** The callback

### trigger

Triggers given event on given context with data.

#### Parameters

-   `context` **[Object][32]** The context
-   `eventName` **[string][31]** The event name
-   `data` **ANY** The data

### off

Removes an event listener if no callback provided, all events will be removed on context with given event.

#### Parameters

-   `context` **[Object][32]** The context
-   `eventName` **[string][31]** The event name
-   `callback` **[Function][33]** The callback (optional)

## argumentsToArray

Converts type arguments into array, with same values

### Parameters

-   `args` **argument** The arguments

Returns **[Array][34]&lt;any>** Array type arguments

## removeDuplicates

Removes duplicates elements in array.

### Parameters

-   `arr` **[Array][34]&lt;any>** Array with duplicate items

Returns **[Array][34]&lt;any>** Array without duplicate items.

[1]: #enumgenerator

[2]: #parameters

[3]: #getcurrentepochtime

[4]: #cachemgr

[5]: #set

[6]: #parameters-1

[7]: #get

[8]: #parameters-2

[9]: #remove

[10]: #parameters-3

[11]: #clearall

[12]: #copy

[13]: #parameters-4

[14]: #deepcopy

[15]: #parameters-5

[16]: #defaultsgenerator

[17]: #parameters-6

[18]: #eventmanager

[19]: #listento

[20]: #parameters-7

[21]: #once

[22]: #parameters-8

[23]: #trigger

[24]: #parameters-9

[25]: #off

[26]: #parameters-10

[27]: #argumentstoarray

[28]: #parameters-11

[29]: #removeduplicates

[30]: #parameters-12

[31]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[32]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[33]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[34]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array