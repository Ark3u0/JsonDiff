
import enumerateType from './enumerateType.jsx';
import React from 'react';

const { Component } = React;

let ID = 1;

class Node extends Component {
  writeValue(value) {
    if (value.nodeType === "ObjectNode" || value.nodeType === "ArrayNode") {
      return value.render();
    }
    return String(value);
  }

  getId() {
    return ID++;
  }
}

module.exports = Node;