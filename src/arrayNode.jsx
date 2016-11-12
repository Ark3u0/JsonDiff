
import enumerateType from './enumerateType.jsx';
import Node from './node.jsx';
import React from 'react';


class ArrayNode extends Node {
  constructor(props) {
    super(props);
    this.array = [];
    this.nodeType = "ArrayNode";
  }

  includeTopLevelLeftBracket() {
    return this.props.isTop ? "[" : null;
  }

  includeTopLevelRightBracket() {
    return this.props.isTop ? "]" : null;
  }

  getArray() {
    return this.array;
  }

  pushElement(tag, element) {
    (tag === 'NEGATIVE')
      ? this.array.push({tag: 'NEGATIVE', src: element, cmp: undefined})
      : this.array.push({tag: 'POSITIVE', src: undefined, cmp: element})
  }

  pushSameElem(sameElement) {
    this.array.push({tag: "SAME", src: sameElement, cmp: sameElement});
  }

  pushDiffElem(srcElement, cmpElement) {
    this.array.push({tag: "DIFF", src: this.props.pushTag('NEGATIVE', srcElement), cmp: this.props.pushTag('POSITIVE', cmpElement)});
  }

  pushByDifferenceInLength(srcArray, cmpArray) {
    let srcLength = srcArray.length;
    let cmpLength = cmpArray.length;

    if (srcLength > cmpLength) {
      _.forEach(srcArray.slice(cmpLength), (elem) => {
        this.array.push({tag: "NEGATIVE", src: this.props.pushTag('NEGATIVE', elem), cmp: undefined});
      });
    }
    if (srcLength < cmpLength) {
      _.forEach(cmpArray.slice(srcLength), (elem) => {
        this.array.push({tag: "POSITIVE", src: undefined, cmp: this.props.pushTag('POSITIVE', elem)});
      });
    }
  }

  render() {
    const padLeft = this.props.isTop ? {paddingLeft: "40px"} : {};

    const output = _.flatten(_.map(this.getArray(), (element) => {
      switch (element.tag) {
        case 'DIFF':
          return [
            <li style={Object.assign({}, styles.removed, padLeft)} key={this.getId()}>
              {this.writeLeftBracket(element.src)}
                {this.writeValue(element.src)}
              {this.writeRightBracket(element.src)}
            </li>,
            <li style={Object.assign({}, styles.added, padLeft)} key={this.getId()}>
              {this.writeLeftBracket(element.cmp)}
                {this.writeValue(element.cmp)}
              {this.writeRightBracket(element.cmp)}
            </li>
          ];
        case 'SAME':
          return [
            <li style={Object.assign({}, styles.same, padLeft)} key={this.getId()}>
              {this.writeLeftBracket(element.src)}
                {this.writeValue(element.src)}
              {this.writeRightBracket(element.src)}
            </li>];
        case 'POSITIVE':
          return [
            <li style={Object.assign({}, styles.added, padLeft)} key={this.getId()}>
              {this.writeLeftBracket(element.cmp)}
                {this.writeValue(element.cmp)}
              {this.writeRightBracket(element.cmp)}
            </li>
          ];
        case 'NEGATIVE':
          return [
            <li style={Object.assign({}, styles.removed, padLeft)} key={this.getId()}>
              {this.writeLeftBracket(element.src)}
                {this.writeValue(element.src)}
              {this.writeRightBracket(element.src)}
            </li>];
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

module.exports = ArrayNode;

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