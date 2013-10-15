# NASA Keypath Module

New Age Keypath Traversal Technology. Traverse and manipulate Objects with ease using the newfangled string dot notation all the kids are raving about!

## Installation

```
npm install nasa-keypath
```

or include `index.js` in your browser.

## Utilization

References

```js
var keypath = require('nasa-keypath');
var on = {
  users: [
    { _id: '290682069820139', password: 'something-unique' },
    { _id: '908164718613492', password: 'something-unique', admin: true }
  ],

  count: {
    total: 2,
    admins: 1
  }
};
```
This code has no real meaning, only to show the power of what keypath can do.

### Functional


```js
// Array Manipulation
keypath.remove(on, 'users.[].password'); // No more passwords, safe to show.
keypath.set(on, 'users.[].activated', true); // All users are now activated.
keypath.get(on, 'users.0.admin'); // Is this user authorized?
keypath.get(on, 'users.[].admin', true); // Get all users who are admin, and full object.

// Manipulation
keypath.get(on, 'count.admins');
keypath.set(on, 'count', keypath.get(on, 'users').length); // We can iterate for admins.
```

### OOP

```js
var path = keypath(on);

// Array Manipulation
path.remove('users.[].password'); // No more passwords, safe to show.
path.set('users.[].activated', true); // All users are now activated.
path.get('users.0.admin'); // Is this user an admin?
path.get('users.[].admin', true); // Get all users who are admin, and full object.

// Manipulation
path.get('count.admins'); // 1
path.set('count', path.get('users').length); // We can iterate for admins.
```
