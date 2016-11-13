
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

  frameElement(element, styles) {
    const padLeft = this.props.isTop ? {paddingLeft: "40px"} : {};

    return <li style={Object.assign({}, styles, padLeft)} key={this.getId()}>
      {this.writeLeftBracket(element)}
        {this.writeValue(element)}
      {this.writeRightBracket(element)}
    </li>
  }

  render() {
    const output = _.flatten(_.map(this.getArray(), (element) => {
      switch (element.tag) {
        case 'DIFF':
          return [
            this.frameElement(element.src, styles.removed),
            this.frameElement(element.cmp, styles.added)
          ];
        case 'SAME':
          return [
            this.frameElement(element.src, styles.same)
          ];
        case 'POSITIVE':
          return [
            this.frameElement(element.cmp, styles.added)
          ];
        case 'NEGATIVE':
          return [
            this.frameElement(element.src, styles.removed)
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