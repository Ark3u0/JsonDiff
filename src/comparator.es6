class Comparator {
  constructor(args) {
    let options = args || {};

    this.src = options.src || {};
    this.cmp = options.cmp || {};
  }

  toString() {
    return "hello world!";
  }
}

module.exports = Comparator;