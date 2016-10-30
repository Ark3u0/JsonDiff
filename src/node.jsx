
class Node {
  constructor() {
    this.fields = [];
  }

  addFieldNegative(fieldNegative) {
    this.fields.push({tag: 'NEGATIVE', src: fieldNegative, cmp: undefined});
  }

  addFieldSame(fieldSame) {
    this.fields.push({tag: 'SAME', src: fieldSame, cmp: fieldSame});
  }

  getFields() {
    return this.fields;
  }

  compareAndAddNonObjectField(key, src, cmp) {
    (src[key] === cmp[key])
      ? this.fields.push({tag: 'SAME', src: {[key]: cmp[key]}, cmp: {[key]: cmp[key]}})
      : this.fields.push({tag: 'DIFF', src: {[key]: src[key]}, cmp: {[key]: cmp[key]}});
  }

  addFieldPositives(src, cmp) {
      let srcKeys = _.keys(src);
      let cmpKeys = _.keys(cmp);

      let uniqueCmpKeys = _.filter(cmpKeys, (key) => {
        return !_.includes(srcKeys, key);
      });

      _.forEach(uniqueCmpKeys, (key) => {
        this.fields.push({tag: 'POSITIVE', src: undefined, cmp: {[key]: cmp[key]}});
      });
  }
}

module.exports = Node;