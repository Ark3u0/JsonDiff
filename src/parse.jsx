import RJSON from 'relaxed-json';

// If RJSONWrapper isn't defined, default to using JSON.parse
let RJSONWrapper = {parse: JSON.parse};

// Should not be accessible everywhere
if (window.RJSON !== undefined) {
  RJSONWrapper = window.RJSON;
  window.RJSON = undefined;
}

module.exports = RJSONWrapper.parse;