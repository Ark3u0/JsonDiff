
class Node {
  constructor() {
    this.fieldNegatives = [];
    this.fieldPositives = [];
    this.fieldDiffs = [];
    this.fieldSames = [];
  }

  addFieldNegative(fieldNegative) {
    this.fieldNegatives.push(fieldNegative);
  }

  addFieldDiff(fieldDiff) {
    this.fieldDiffs.push(fieldDiff);
  }

  addFieldSame(fieldSame) {
    this.fieldSames.push(fieldSame)
  }

  getFieldNegatives() {
    return this.fieldNegatives;
  }

  getFieldPositives() {
    return this.fieldPositives;
  }

  getFieldDiffs() {
    return this.fieldDiffs;
  }

  getFieldSames() {
    return this.fieldSames;
  }

  addFieldPositives(src, cmp) {
      let srcKeys = _.keys(src);
      let cmpKeys = _.keys(cmp);

      let uniqueCmpKeys = _.filter(cmpKeys, (key) => {
        return !_.includes(srcKeys, key);
      });

      _.forEach(uniqueCmpKeys, (key) => {
        this.fieldPositives.push({[key]: cmp[key]});
      });
  }
}

module.exports = Node;