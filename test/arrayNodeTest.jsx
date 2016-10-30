import ArrayNode from '../src/arrayNode.jsx';

describe('ArrayNode', () => {
  describe('pushByDifferenceInLength', () => {

    it('should push that something was taken away (NEGATIVE) if src array is longer than cmp array', () => {
      let srcArray = ['el1', 'el2'];
      let cmpArray = ['el1'];
      let arrayNode = new ArrayNode();

      arrayNode.pushByDifferenceInLength(srcArray, cmpArray);

      expect(arrayNode.getArray()).toEqual([{tag: "NEGATIVE", src: 'el2', cmp: undefined}]);
    });

    it('should push that something was added (POSITIVE) if cmp array is longer than src array', () => {
      let srcArray = ['el1'];
      let cmpArray = ['el1', 'el2'];
      let arrayNode = new ArrayNode();

      arrayNode.pushByDifferenceInLength(srcArray, cmpArray);

      expect(arrayNode.getArray()).toEqual([{tag: "POSITIVE", src: undefined, cmp: 'el2'}]);
    });

    it('should not push anything if arrays same size', () => {
      let srcArray = ['el1'];
      let cmpArray = ['el1'];
      let arrayNode = new ArrayNode();

      arrayNode.pushByDifferenceInLength(srcArray, cmpArray);

      expect(arrayNode.getArray()).toEqual([]);
    });

  });

  it('should push that something is different (DIFF)', () => {
    let arrayNode = new ArrayNode();

    arrayNode.pushDiffElem('original', 'changed');

    expect(arrayNode.getArray()).toEqual([{tag: 'DIFF', src: 'original', cmp: 'changed'}]);
  });

  it('should push that something was stayed the same (SAME)', () => {
    let arrayNode = new ArrayNode();

    arrayNode.pushSameElem('stayed the same');

    expect(arrayNode.getArray()).toEqual([{tag: 'SAME', src: 'stayed the same', cmp: 'stayed the same'}]);
  });
});