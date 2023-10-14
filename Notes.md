# Notes (not react specific)

> Clean up node_modules:

```bash
find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
```

### [Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)

## Introduction to the JavaScript Array at() method

In JavaScript, you can use the square bracket `[]` to access an element of an [array](https://www.javascripttutorial.net/javascript-array/). For example, the `arr[0]` returns the first element in the array `arr`, the `arr[1]` returns the second element, and so on.

To get the last element in an array, you use the `length` property like this:

`arr[length-1]`Code language: CSS (css)

JavaScript doesn't allow you to use a negative index to access the last element like other languages e.g., Python. For example, the following returns undefined:

`arr[-1]`Code language: CSS (css)

The reason is that JavaScript also uses square brackets `[]` for accessing a property of an [object](https://www.javascripttutorial.net/javascript-objects/).

For example, the `obj[1]` returns a property of the object `obj` with the key `"1"`. Hence, the `obj[-1]` returns the property of an object with the key `"-1"`.

In the above example, the `arr[-1]` returns the property of the `arr` object with the key `"-1"`. Note that the type of an array is `object`. Since the `"-1"` property doesn't exist in the `arr` object, it returns `undefined`.

---

**Local Storage vs. Session Storage vs. Cookie**

| Feature                 | Local Storage                                  | Session Storage                                     | Cookies                                                 |
| ----------------------- | ---------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------- |
| Lifespan                | Persistent (until manually cleared)            | Limited to session (cleared when tab is closed)     | Defined expiration (can be persistent or session-based) |
| Storage Limit           | ~5-10 MB                                       | ~5-10 MB                                            | ~4 KB                                                   |
| Scope                   | Origin-based (same protocol, domain, and port) | Origin-based (same protocol, domain, and port)      | Domain-based (can be sent across subdomains)            |
| Sent with HTTP Requests | No                                             | No                                                  | Yes (in headers)                                        |
| Accessibility           | JavaScript only                                | JavaScript only                                     | JavaScript & server-side                                |
| Use Cases               | Storing large amounts of data without expiring | Storing data for one session (like a shopping cart) | Storing small pieces of data, authentication, tracking  |
| Security Concerns       | Vulnerable to XSS attacks                      | Vulnerable to XSS attacks                           | Vulnerable to XSS & CSRF attacks                        |

**In JS function declerations are hoisted to the top of the scope, but function expressions are not.**

So I can do this:

```js
const { movies, loading, error } = useMovies(query, handleCloseMovie, KEY);

function handleCloseMovie() {
  setSelectedId(null);
}
```

But not this:

```js
const { movies, loading, error } = useMovies(query, handleCloseMovie, KEY);

const handleCloseMovie = () => {
  setSelectedId(null);
};
```

### Countries Array From WorldWise (explination):

```js
// 'countries' is a constant which will contain the final array of unique countries
const countries = cities.reduce((arr, city) => {
  // For each 'city' in the 'cities' array

  // .map() creates a new array with the results of calling a provided function
  // on every element in the array it was called upon. Here we are mapping over 'arr',
  // and for each element (el), we are returning its 'country' property.
  // After that, .includes() method is used to check if the 'country' property of the current 'city'
  // exists in the newly formed array of country names.
  if (!arr.map((el) => el.country).includes(city.country))
    // If the 'country' property of 'city' doesn't exist in 'arr',
    // then we return a new array which includes all previous elements in 'arr'
    // plus a new object which has 'country' and 'emoji' properties of the current 'city'.
    return [...arr, { country: city.country, emoji: city.emoji }];
  // If the 'country' property of 'city' exists in 'arr', we simply return the 'arr' as is.
  else return arr;

  // The second argument to .reduce() provides an initial value for 'arr'. Here it's an empty array.
}, []);
```

---

---

## Leaflet

**Installing Leaflet for Map Functionality**

##### [Leaflet Documentation](https://react-leaflet.js.org/)

```bash
npm i react-leaflet leaflet
```

**Css for Leaflet**

```css
/* Taken from getting started guide at: https://leafletjs.com/examples/quick-start/ */
@import "https://unpkg.com/leaflet@1.9.3/dist/leaflet.css";
```

**Date Picker**

###### [React Date Picker](https://www.npmjs.com/package/react-datepicker)

```bash
npm install react-datepicker
```

```js
<DatePicker
  id="date"
  onChange={(date) => setDate(date)}
  selected={date}
  dateFormat="dd/MM/yyyy"
/>
```

### [Regex Library](https://uibakery.io/regex-library/email)

---

# Redux Toolkit's `createSlice` and JavaScript Notation

The code you provided is using the Redux Toolkit's `createSlice` function to create a slice of the Redux store. The `reducers` object inside the slice definition is specific to the Redux Toolkit's syntax.

However, the structure inside the `reducers` object:

```javascript
{
    updateName(state, action) {
        state.username = action.payload;
    }
}
```

is just standard JavaScript object notation with method shorthand. This syntax allows you to define methods inside objects without using the `function` keyword. It was introduced in ES6 (also known as ECMAScript 2015).

## Comparison

1. **Standard JS Notation (prior to ES6)**:

```javascript
var obj = {
    updateName: function(state, action) {
        state.username = action.payload;
    }
};
```

2. **ES6 Method Shorthand**:

```javascript
var obj = {
    updateName(state, action) {
        state.username = action.payload;
    }
};
```

Both of the above approaches achieve the same thing, but the second one is shorter and more concise.

## Conclusion

So, to clarify: the method shorthand is standard JavaScript notation introduced in ES6. However, the overall structure of the `createSlice` function and how it uses the `reducers` object is specific to the Redux Toolkit.

---

## React Table Accessibility...

- If we implement a table without using the html table element then we need to add the attribute `role='table'` to the Table component.

```jsx
 <Table role='table'>
      <TableHeader role='row'>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
        <div></div>
    
      </TableHeader>
    </Table>
```

---

# Nullish Coalescing Operator in JavaScript

In JavaScript, `??` is known as the "nullish coalescing operator." It's a logical operator that returns its right-hand side operand when its left-hand side operand is `null` or `undefined`, and otherwise returns its left-hand side operand.

## Explanation:

```javascript
let result = a ?? b;
```

This means:

- If `a` is neither `null` nor `undefined`, then `result` is `a`.
- If `a` is either `null` or `undefined`, then `result` is `b`.

This is particularly useful when you want to provide default values. For example:

```javascript
let userInput = null;
let defaultInput = "Default Name";
let name = userInput ?? defaultInput;  // name will be "Default Name"
```

This operator is different from the logical OR (`||`) operator. The `||` operator will return the right-hand side if the left-hand side is falsy (i.e., `false`, `0`, `""`, `null`, `undefined`, or `NaN`). The `??` operator only considers `null` and `undefined`.

Example:

```javascript
let a = 0;
let b = "hello";

console.log(a || b);  // "hello", because 0 is falsy
console.log(a ?? b);  // 0, because 0 is not null or undefined
```

Make sure to use the nullish coalescing operator in scenarios where you specifically want to handle `null` and `undefined` values, rather than all falsy values.

---

Creating temporary emails for testing purposes:

> https://temp-mail.org/en/



**document.documentElement**

- The document.documentElement refers to the root html element of the document. It is equivalent to document.getElementsByTagName('html')[0].
