import compare from '../src/compare.jsx';
import ObjectNode from '../src/objectNode.jsx';
import ArrayNode from '../src/arrayNode.jsx';
import pushTag from '../src/pushTag.jsx';

describe('compare', () => {
  const emptyObjectNodeWithIsTop = new ObjectNode({pushTag: pushTag, isTop: undefined});
  const emptyObjectNode = new ObjectNode({pushTag: pushTag});

  it('should return empty ObjectNode when srcJSON and cmpJSON are empty objects', () => {
    let srcJSON = {};
    let cmpJSON = {};

    let outputNode = compare(srcJSON, cmpJSON);

    expect(outputNode.getFields()).toEqual([]);
  });

  it('should add field positives to ObjectNode when cmpJSON has fields srcJSON does not', () => {
    let srcJSON = {};
    let cmpJSON = {string: 'string', number: 123, boolean: true, object: {}, null: null};

    let outputNode = compare(srcJSON, cmpJSON);

    expect(outputNode.getFields()).toEqual([
      {tag: 'POSITIVE', key: 'string', src: undefined, cmp: 'string'},
      {tag: 'POSITIVE', key: 'number', src: undefined, cmp: 123},
      {tag: 'POSITIVE', key: 'boolean', src: undefined, cmp: true},
      {tag: 'POSITIVE', key: 'object', src: undefined, cmp: emptyObjectNode},
      {tag: 'POSITIVE', key: 'null', src: undefined, cmp: null}]);
  });

  it('should add field negatives to ObjectNode when srcJSON has field cmpJSON does not', () => {
    let srcJSON = {string: 'string', number: 123, boolean: true, object: {}, null: null};
    let cmpJSON = {};

    let outputNode = compare(srcJSON, cmpJSON);

    expect(outputNode.getFields()).toEqual([
      {tag: 'NEGATIVE', key: 'string', cmp: undefined, src: 'string'},
      {tag: 'NEGATIVE', key: 'number', cmp: undefined, src: 123},
      {tag: 'NEGATIVE', key: 'boolean', cmp: undefined, src: true},
      {tag: 'NEGATIVE', key: 'object', cmp: undefined, src: emptyObjectNode},
      {tag: 'NEGATIVE', key: 'null', cmp: undefined, src: null}]);
  });

  it('should add field diffs and sames to ObjectNode when srcJSON and cmpJSON when Object/Array typing are not equal', () => {
    let srcJSON = {string: 'string1', number: 123, boolean: true, null: null, something: {}};
    let cmpJSON = {string: 'string2', number: true, boolean: null, null: null, something: 'hello'};

    let outputNode = compare(srcJSON, cmpJSON);

    expect(outputNode.getFields()).toEqual([
      {tag: 'DIFF', key: 'string', src: 'string1', cmp: 'string2'},
      {tag: 'DIFF', key: 'number', src: 123, cmp: true},
      {tag: 'DIFF', key: 'boolean', src: true, cmp: null},
      {tag: 'SAME', key: 'null', src: null, cmp: null},
      {tag: 'DIFF', key: 'something', src: emptyObjectNode, cmp: 'hello'}]);
  });

  it('should invoke compare on child objects when field on srcJSON and cmpJSON both have object typing', () => {
    let srcJSON = {object: {}};
    let cmpJSON= {object: {}};

    let outputNode = compare(srcJSON, cmpJSON);

    expect(outputNode.getFields()).toEqual([
      {tag: 'SAME', key: 'object', src: emptyObjectNodeWithIsTop, cmp: emptyObjectNodeWithIsTop}]);
  });

  it('should treat objects in array as the same', () => {
    let srcJSON = {array: [{}]};
    let cmpJSON = {array: [{}]};

    let outputNode = compare(srcJSON, cmpJSON);

    expect(outputNode.getFields().length).toEqual(1);
    expect(outputNode.getFields()[0].tag).toEqual('SAME');
    expect(outputNode.getFields()[0].key).toEqual('array');
    expect(outputNode.getFields()[0].src instanceof ArrayNode).toEqual(true);
    expect(outputNode.getFields()[0].cmp instanceof ArrayNode).toEqual(true);
    expect(outputNode.getFields()[0].src.getArray()[0].tag).toEqual('SAME');
    expect(outputNode.getFields()[0].src.getArray()[0].src instanceof ObjectNode).toEqual(true);
    expect(outputNode.getFields()[0].src.getArray()[0].cmp instanceof ObjectNode).toEqual(true);
  });

  it('should treat arrays in array as the same', () => {
    let srcJSON = {array: [[]]};
    let cmpJSON = {array: [[]]};

    let outputNode = compare(srcJSON, cmpJSON);

    expect(outputNode.getFields().length).toEqual(1);
    expect(outputNode.getFields()[0].tag).toEqual('SAME');
    expect(outputNode.getFields()[0].key).toEqual('array');
    expect(outputNode.getFields()[0].src instanceof ArrayNode).toEqual(true);
    expect(outputNode.getFields()[0].cmp instanceof ArrayNode).toEqual(true);
    expect(outputNode.getFields()[0].src.getArray()[0].tag).toEqual('SAME');
    expect(outputNode.getFields()[0].src.getArray()[0].src instanceof ArrayNode).toEqual(true);
    expect(outputNode.getFields()[0].src.getArray()[0].cmp instanceof ArrayNode).toEqual(true);
  });

  it('should push diff element in array if not object/array and are not equal', () => {
    let srcJSON = {array: ['a']};
    let cmpJSON = {array: ['b']};

    let outputNode = compare(srcJSON, cmpJSON);

    expect(outputNode.getFields().length).toEqual(1);
    expect(outputNode.getFields()[0].tag).toEqual('SAME');
    expect(outputNode.getFields()[0].key).toEqual('array');
    expect(outputNode.getFields()[0].src instanceof ArrayNode).toEqual(true);
    expect(outputNode.getFields()[0].cmp instanceof ArrayNode).toEqual(true);
    expect(outputNode.getFields()[0].src.getArray()[0].tag).toEqual('DIFF');
    expect(outputNode.getFields()[0].src.getArray()[0].src).toEqual('a');
    expect(outputNode.getFields()[0].src.getArray()[0].cmp).toEqual('b');
  });

  it('should push same element in array if equal', () => {
    let srcJSON = {array: ['a']};
    let cmpJSON = {array: ['a']};

    let outputNode = compare(srcJSON, cmpJSON);

    expect(outputNode.getFields().length).toEqual(1);
    expect(outputNode.getFields()[0].tag).toEqual('SAME');
    expect(outputNode.getFields()[0].key).toEqual('array');
    expect(outputNode.getFields()[0].src instanceof ArrayNode).toEqual(true);
    expect(outputNode.getFields()[0].cmp instanceof ArrayNode).toEqual(true);
    expect(outputNode.getFields()[0].src.getArray()[0].tag).toEqual('SAME');
    expect(outputNode.getFields()[0].src.getArray()[0].src).toEqual('a');
    expect(outputNode.getFields()[0].src.getArray()[0].cmp).toEqual('a');
  });

  it('should push for elements when the lengths are not the same size', () => {
    let srcJSON = {array: ['a']};
    let cmpJSON = {array: ['a', 'b']};

    let outputNode = compare(srcJSON, cmpJSON);

    expect(outputNode.getFields().length).toEqual(1);
    expect(outputNode.getFields()[0].tag).toEqual('SAME');
    expect(outputNode.getFields()[0].key).toEqual('array');
    expect(outputNode.getFields()[0].src instanceof ArrayNode).toEqual(true);
    expect(outputNode.getFields()[0].cmp instanceof ArrayNode).toEqual(true);
    expect(outputNode.getFields()[0].src.getArray()[0].tag).toEqual('SAME');
    expect(outputNode.getFields()[0].src.getArray()[0].src).toEqual('a');
    expect(outputNode.getFields()[0].src.getArray()[0].cmp).toEqual('a');
    expect(outputNode.getFields()[0].src.getArray()[1].tag).toEqual('POSITIVE');
    expect(outputNode.getFields()[0].src.getArray()[1].src).not.toBeDefined();
    expect(outputNode.getFields()[0].src.getArray()[1].cmp).toEqual('b');
  });
});


