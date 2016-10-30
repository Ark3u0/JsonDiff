
class ArrayNode {
  constructor() {
    this.array = [];
  }

  getArray() {
    return this.array;
  }

  pushSameElem(sameElement) {
    this.array.push({tag: "SAME", src: sameElement, cmp: sameElement});
  }

  pushDiffElem(srcElement, cmpElement) {
    this.array.push({tag: "DIFF", src: srcElement, cmp: cmpElement});
  }

  pushByDifferenceInLength(srcArray, cmpArray) {
    let srcLength = srcArray.length;
    let cmpLength = cmpArray.length;

    if (srcLength > cmpLength) {
      _.forEach(srcArray.slice(cmpLength), (elem) => {
        this.array.push({tag: "NEGATIVE", src: elem, cmp: undefined});
      });
    }
    if (srcLength < cmpLength) {
      _.forEach(cmpArray.slice(srcLength), (elem) => {
        this.array.push({tag: "POSITIVE", src: undefined, cmp: elem});
      });
    }
  }
}

module.exports = ArrayNode;