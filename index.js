var nasa = (typeof nasa === 'undefined' || Object.prototype.toString.call(nasa) !== '[object Object]') ? {} : nasa;

/**
 * Key-path manipulation for Objects with Array Support.
 * 
 * Manipulating Array on Object:
 *     
 *     var from = { users: [ { id: '2935809235', password: 'password' } ... ] };
 *     nasa.keypath.remove(from, 'users.[].password'); // from now no longer has password property on users array.
 *     nasa.keypath.get(from, 'users.0.id'); // 2935809235
 *     nasa.keypath.set(from, 'users.[].name', 'spaceman') // All users are now named spaceman.
 *
 * @param  {Object|Array} reference Reference
 * @param  {String}       path Reference Keypath
 * @param  {Mixed}        value   Value for insertion at ending point of keypath
 * @param  {Boolean}      unset   Remove field?
 * @return {Mixed}
 * 
 * @author Nijiko Yonskai
 * @copyright 2013 MIT License
 */
nasa.keypath = function (reference, path, value, unset, complete) {
  if (reference && !path && !value && !unset) {
    return {
      get: function (path, complete) { return nasa.keypath(reference, path, null, null, complete); },
      set: function (path, value) { return nasa.keypath(reference, path, value); },
      remove: function (path) { return nasa.keypath(reference, path, null, true); }
    };
  }
  
  var key, result = {}, results;
  
  path = typeof path == 'string' ? path.split('.') : path;
  key = path.shift();

  if (key && path.length) {
    if (key === '[]' && Object.prototype.toString.call(reference) === '[object Array]') {
      if (!value && !unset) results = [];
      for (var i = 0; i < reference.length; i++) {
        if (!value && unset) {
          nasa.keypath(reference[i], path.slice(0), value, unset);
        } else if (!value) {
          if (result = nasa.keypath(reference[i], path.slice(0), value, unset, complete))
            results.push(result);
        } else {
          reference[i] = nasa.keypath(reference[i], path.slice(0), value, unset, complete);
        }
      }

      return (value) ? reference : (unset) ? undefined : results;
    } else {
      if (!reference[key]) {
        if (value) reference[key] = {};
        else return undefined;
      }
      
      if (!value) return nasa.keypath(reference[key], path, value, unset, complete);
      else reference[key] = nasa.keypath(reference[key], path, value, unset, complete);
    }
  } else {
    if (value) {
      if (typeof reference !== 'object') reference = {};
      result[key] = reference[key] = value;
      return reference;
    } else {
      if (unset) delete reference[key];
      else if (complete) return reference;
      else return (typeof reference !== 'undefined') ? reference[key] : undefined;
    }
  }
};

nasa.keypath.get = function (reference, path, complete) {
  return nasa.keypath(reference, path, null, null, complete);
};

nasa.keypath.set = function (reference, path, value) {
  return nasa.keypath(reference, path, value);
};

nasa.keypath.remove = function (reference, path) {
  return nasa.keypath(reference, path, null, true);
};

// Node.js check
if (typeof exports !== 'undefined' && this.exports !== exports) 
  module.exports = nasa.keypath;