
import enumerateType from './enumerateType.jsx';
import Node from './node.jsx';
import React from 'react';

class ObjectNode extends Node {
  constructor(props) {
    super(props);
    this.fields = [];
    this.nodeType = "ObjectNode";
  }

  includeTopLevelLeftBracket() {
    return this.props.isTop ? "{" : null;
  }

  includeTopLevelRightBracket() {
    return this.props.isTop ? "}" : null;
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
    const padLeft = this.props.isTop ? {paddingLeft: "40px"} : {};

    const output = _.flatten(_.map(this.getFields(), (field) => {
      switch (field.tag) {
        case 'DIFF':
          return [
            <li style={Object.assign({}, styles.removed, padLeft)} key={this.getId()}>
              {String(field.key)}: {this.writeLeftBracket(field.src)}
                {this.writeValue(field.src)}
              {this.writeRightBracket(field.src)}
            </li>,
            <li style={Object.assign({}, styles.added, padLeft)} key={this.getId()}>
              {String(field.key)}: {this.writeLeftBracket(field.cmp)}
                {this.writeValue(field.cmp)}
              {this.writeRightBracket(field.cmp)}
            </li>
          ];
        case 'SAME':
          return [
            <li style={Object.assign({}, styles.same, padLeft)} key={this.getId()}>
              {String(field.key)}: {this.writeLeftBracket(field.src)}
                {this.writeValue(field.src)}
              {this.writeRightBracket(field.src)}
            </li>
          ];
        case 'POSITIVE':
          return [
            <li style={Object.assign({}, styles.added, padLeft)} key={this.getId()}>
              {String(field.key)}: {this.writeLeftBracket(field.cmp)}
                {this.writeValue(field.cmp)}
              {this.writeRightBracket(field.cmp)}
            </li>
          ];
        case 'NEGATIVE':
          return [
            <li style={Object.assign({}, styles.removed, padLeft)} key={this.getId()}>
              {String(field.key)}: {this.writeLeftBracket(field.src)}
                {this.writeValue(field.src)}
              {this.writeRightBracket(field.src)}
            </li>
          ];
        default:
          return [];
      }
    }));
    return <ul style={styles.listContainer}>
      {this.includeTopLevelLeftBracket()}
      {output}
      {this.includeTopLevelRightBracket()}
    </ul>;
  }
}

module.exports = ObjectNode;

const styles = {
  removed: {
    backgroundColor: "#F47B7B"
  },
  added: {
    backgroundColor: "#0EFF6A"
  },
  same: {},
  listContainer: {
    listStyleType: "none"
  }
};