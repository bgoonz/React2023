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
