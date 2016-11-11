
import enumerateType from './enumerateType.jsx';
import Node from './node.jsx';
import React from 'react';

class ObjectNode extends Node {
  constructor(props) {
    super(props);
    this.fields = [];

    this.nodeType = "ObjectNode";
  }
  
  addField(tag, key, field) {
     (tag === 'NEGATIVE')
       ? this.fields.push({tag: 'NEGATIVE', key: key, src: field, cmp: undefined})
       : this.fields.push({tag: 'POSITIVE', key: key, src: undefined, cmp: field})
  }

  addFieldNegative(key, fieldNegative) {
    this.fields.push({tag: 'NEGATIVE', key: key, src: this.props.pushTag('NEGATIVE', fieldNegative), cmp: undefined});
  }

  addFieldSame(key, fieldSame) {
    this.fields.push({tag: 'SAME', key: key, src: fieldSame, cmp: fieldSame});
  }

  getFields() {
    return this.fields;
  }

  compareAndAddNonObjectField(key, src, cmp) {
    (src[key] === cmp[key])
      ? this.fields.push({tag: 'SAME', key: key, src: cmp[key], cmp: cmp[key]})
      : this.fields.push({tag: 'DIFF', key: key, src: this.props.pushTag('NEGATIVE', src[key]), cmp: this.props.pushTag('POSITIVE', cmp[key])});
  }

  addFieldPositives(src, cmp) {
      let srcKeys = _.keys(src);
      let cmpKeys = _.keys(cmp);

      let uniqueCmpKeys = _.filter(cmpKeys, (key) => {
        return !_.includes(srcKeys, key);
      });

      _.forEach(uniqueCmpKeys, (key) => {
        this.fields.push({tag: 'POSITIVE', key: key, src: undefined, cmp: this.props.pushTag('POSITIVE', cmp[key])});
      });
  }

  render() {
    const output = _.flatten(_.map(this.getFields(), (field) => {
      switch (field.tag) {
        case 'DIFF':
          return [<li style={styles.removed} key={this.getId()}>{String(field.key)}: {this.writeValue(field.src)}</li>,
            <li style={styles.added} key={this.getId()}>{String(field.key)}: {this.writeValue(field.cmp)}</li>];
        case 'SAME':
          return [<li key={this.getId()}>{String(field.key)}: {this.writeValue(field.src)}</li>];
        case 'POSITIVE':
          return [<li style={styles.added} key={this.getId()}>{String(field.key)}: {this.writeValue(field.cmp)}</li>];
        case 'NEGATIVE':
          return [<li style={styles.removed} key={this.getId()}>{String(field.key)}: {this.writeValue(field.src)}</li>];
        default:
          return [];
      }
    }));
    return <ul style={styles.unbulleted}>
      {'{'}
      {output}
      {'}'}
    </ul>;
  }
}

module.exports = ObjectNode;

const styles = {
  removed: {
    backgroundColor: "#F47B7B",
    paddingLeft: "10px"
  },
  added: {
    backgroundColor: "#0EFF6A",
    paddingLeft: "10px"
  },
  unbulleted: {
    listStyleType: "none"
  }
};