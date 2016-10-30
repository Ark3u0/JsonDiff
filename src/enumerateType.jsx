module.exports = (obj) => {
  if (obj === null) {
    return "NULL";
  } else if (typeof obj === 'string') {
    return "STRING";
  } else if (typeof obj === 'number') {
    return "NUMBER";
  } else if (typeof obj === 'boolean') {
    return "BOOLEAN";
  } else if (typeof obj === 'object') {
    return isArray(obj) ? 'ARRAY' : 'OBJECT';
  } else {
    return "UNDEFINED";
  }
};

const isArray = (obj) => {
  return !!obj && Array === obj.constructor;
};