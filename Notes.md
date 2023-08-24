# Notes (not react specific)

## Introduction to the JavaScript Array at() method

In JavaScript, you can use the square bracket `[]` to access an element of an [array](https://www.javascripttutorial.net/javascript-array/). For example, the `arr[0]` returns the first element in the array `arr`, the `arr[1]` returns the second element, and so on.

To get the last element in an array, you use the `length` property like this:

`arr[length-1]`Code language: CSS (css)

JavaScript doesn't allow you to use a negative index to access the last element like other languages e.g., Python. For example, the following returns undefined:

`arr[-1]`Code language: CSS (css)

The reason is that JavaScript also uses square brackets `[]` for accessing a property of an [object](https://www.javascripttutorial.net/javascript-objects/).

For example, the `obj[1]` returns a property of the object `obj` with the key `"1"`. Hence, the `obj[-1]` returns the property of an object with the key `"-1"`.

In the above example, the `arr[-1]` returns the property of the `arr` object with the key `"-1"`. Note that the type of an array is `object`. Since the `"-1"` property doesn't exist in the `arr` object, it returns `undefined`.
