# Notes (not react specific)

> Clean up node_modules:

```bash
find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
```

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
