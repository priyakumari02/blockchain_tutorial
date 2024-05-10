# smart-split

The default `String.prototype.split()` function behaves very differently for `String` and `RegExp` inputs. `smart-split` normalizes that behavior.

## Installation

```sh
npm install smart-split
```

## Usage

```js
var split = require('smart-split')

split(input, splitOn)
```

## Differences with `String.prototype.split()`

`smart-split` will always return the split portions of the string, interspersed with the split-on portions of the string.

```js
split('a b c', ' ')   // ['a', ' ', 'b', ' ', 'c']
split('a bxc', / |x/) // ['a', ' ', 'b', 'x', 'c']
'a b c'.split(' ')    // ['a', 'b', 'c']
'a bxc'.split(/ |x/)  // ['a', 'b', 'c']
```

`String.prototype.split()` has weird behavior with matching parentheses, which makes predicting the output for unknown `RegExp` input difficult. `smart-split` ignores matching parens, and always outputs the full matched string.

```js
split('a b c', / /)     // ['a', ' ', 'b', ' ', 'c']
split('a b c', /( )/)   // ['a', ' ', 'b', ' ', 'c']
split('a b c', /( )()/) // ['a', ' ', 'b', ' ', 'c']
'a b c'.split(/ /)      // ['a', 'b', 'c']
'a b c'.split(/( )/)    // ['a', ' ', 'b', ' ', 'c']
'a b c'.split(/( ())/)  // ['a', ' ', '', 'b', ' ', '', 'c']
```

These two features mean:

* `split(input, x).join() === input`, which is useful for reconstructing the original string from the split version.
* Whatever the input is, the even indicies (0,2,4...) will always contain the split input, and the odd indicies (1, 3...) will have the splitters.
