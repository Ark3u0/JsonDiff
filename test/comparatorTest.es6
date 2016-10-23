import Comparator from '../src/comparator.es6';

describe('Comparator Test', () => {
  it("does something", () => {
    expect(new Comparator({src: "", cmp: ""}).toString()).toBe("hello world!");
  })
});

