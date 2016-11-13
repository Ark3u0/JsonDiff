
import enumerateType from './enumerateType.jsx';
import React from 'react';

const { Component } = React;

let ID = 1;

class Node extends Component {
  writeValue(value) {
    if (value !== null && value.nodeType === "ObjectNode") {
      return (value.getFields().length === 0) ? null : value.render();
    } else if (value !== null && value.nodeType === "ArrayNode") {
      return (value.getArray().length === 0) ? null : value.render();
    } else {
      const type = enumerateType(value);
      switch (type) {
        case "STRING":
          return <span style={styles.string}>{"\"" + String(value) + "\""}</span>;
        case "BOOLEAN":
          return <span style={styles.boolean}>{String(value)}</span>;
        case "NUMBER":
          return <span style={styles.number}>{String(value)}</span>;
        case "NULL":
          return <span style={styles.null}>{String(value)}</span>;
        default:
          throw "Attempting to render value that is not a defined type.";
      }
    }
  }

  writeLeftBracket(value) {
    if (value !== null && value.nodeType === "ObjectNode") {
      return "{";
    } else if ( value !== null && value.nodeType === "ArrayNode") {
      return "[";
    } else {
      return "";
    }
  }

  writeRightBracket(value) {
    if (value !== null && value.nodeType === "ObjectNode") {
      return "}";
    } else if (value !== null && value.nodeType === "ArrayNode") {
      return "]";
    } else {
      return "";
    }
  }

  getId() {
    return ID++;
  }
}

const styles = {
  string: {
    fontWeight: "bold",
    color: "green"
  },
  boolean: {
    fontWeight: "bold",
    color: "blue"
  },
  null: {
    fontWeight: "bold",
    color: "purple"
  },
  number: {
    color: "blue"
  }
};

module.exports = Node;