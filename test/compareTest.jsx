import compare from '../src/compare.jsx';
import Node from '../src/node.jsx';
import ArrayNode from '../src/arrayNode.jsx';

describe('compare', () => {

  it('should return empty Node when srcJSON and cmpJSON are empty objects', () => {
    let srcJSON = {};
    let cmpJSON = {};

    let outputNode = compare(srcJSON, cmpJSON);

    expect(outputNode.getFields()).toEqual([]);
  });

  it('should add field positives to Node when cmpJSON has fields srcJSON does not', () => {
    let srcJSON = {};
    let cmpJSON = {string: 'string', number: 123, boolean: true, object: {}, null: null};

    let outputNode = compare(srcJSON, cmpJSON);

    expect(outputNode.getFields()).toEqual([
      {tag: 'POSITIVE', src: undefined, cmp: {string: 'string'}},
      {tag: 'POSITIVE', src: undefined, cmp: {number: 123}},
      {tag: 'POSITIVE', src: undefined, cmp: {boolean: true}},
      {tag: 'POSITIVE', src: undefined, cmp: {object: {}}},
      {tag: 'POSITIVE', src: undefined, cmp: {null: null}}]);
  });

  it('should add field negatives to Node when srcJSON has field cmpJSON does not', () => {
    let srcJSON = {string: 'string', number: 123, boolean: true, object: {}, null: null};
    let cmpJSON = {};

    let outputNode = compare(srcJSON, cmpJSON);

    expect(outputNode.getFields()).toEqual([
      {tag: 'NEGATIVE', cmp: undefined, src: {string: 'string'}},
      {tag: 'NEGATIVE', cmp: undefined, src: {number: 123}},
      {tag: 'NEGATIVE', cmp: undefined, src: {boolean: true}},
      {tag: 'NEGATIVE', cmp: undefined, src: {object: {}}},
      {tag: 'NEGATIVE', cmp: undefined, src: {null: null}}]);
  });

  it('should add field diffs and sames to Node when srcJSON and cmpJSON when Object/Array typing are not equal', () => {
    let srcJSON = {string: 'string1', number: 123, boolean: true, null: null, something: {}};
    let cmpJSON = {string: 'string2', number: true, boolean: null, null: null, something: 'hello'};

    let outputNode = compare(srcJSON, cmpJSON);

    expect(outputNode.getFields()).toEqual([
      {tag: 'DIFF', src: {string: 'string1'}, cmp: {string: 'string2'}},
      {tag: 'DIFF', src: {number: 123}, cmp: {number: true}},
      {tag: 'DIFF', src: {boolean: true}, cmp: {boolean: null}},
      {tag: 'SAME', src: {null: null}, cmp: {null: null}},
      {tag: 'DIFF', src: {something: {}}, cmp: {something: 'hello'}}]);
  });

  it('should invoke compare on child objects when field on srcJSON and cmpJSON both have object typing', () => {
    let srcJSON = {object: {}};
    let cmpJSON= {object: {}};

    let outputNode = compare(srcJSON, cmpJSON);

    expect(outputNode.getFields()).toEqual([
      {tag: 'SAME', src: {object: new Node()}, cmp: {object: new Node()}}]);
  });

  it('should treat objects in array as the same', () => {
    let srcJSON = {array: [{}]};
    let cmpJSON = {array: [{}]};

    let outputNode = compare(srcJSON, cmpJSON);

    expect(outputNode.getFields().length).toEqual(1);
    expect(outputNode.getFields()[0].tag).toEqual('SAME');
    expect(outputNode.getFields()[0].src).toEqual(outputNode.getFields()[0].cmp);
    expect(outputNode.getFields()[0].src.array instanceof ArrayNode).toEqual(true);
    expect(outputNode.getFields()[0].src.array.getArray()[0].src).toEqual(outputNode.getFields()[0].src.array.getArray()[0].cmp);
    expect(outputNode.getFields()[0].src.array.getArray()[0].src instanceof Node).toEqual(true);

  });

  it('should treat arrays in array as the same', () => {
    let srcJSON = {array: [[]]};
    let cmpJSON = {array: [[]]};

    let outputNode = compare(srcJSON, cmpJSON);

    expect(outputNode.getFields().length).toEqual(1);
    expect(outputNode.getFields()[0].tag).toEqual('SAME');
    expect(outputNode.getFields()[0].src).toEqual(outputNode.getFields()[0].cmp);
    expect(outputNode.getFields()[0].src.array instanceof ArrayNode).toEqual(true);
    expect(outputNode.getFields()[0].src.array.getArray()[0].src).toEqual(outputNode.getFields()[0].src.array.getArray()[0].cmp);
    expect(outputNode.getFields()[0].src.array.getArray()[0].src instanceof ArrayNode).toEqual(true);

  });

  it('should push diff element in array if not object/array and are not equal', () => {
    let srcJSON = {array: ['a']};
    let cmpJSON = {array: ['b']};

    let outputNode = compare(srcJSON, cmpJSON);

    expect(outputNode.getFields().length).toEqual(1);
    expect(outputNode.getFields()[0].tag).toEqual('SAME');
    expect(outputNode.getFields()[0].src.array instanceof ArrayNode).toEqual(true);
    expect(outputNode.getFields()[0].src.array.getArray()[0].tag).toEqual('DIFF');
    expect(outputNode.getFields()[0].src.array.getArray()[0].src).toEqual('a');
    expect(outputNode.getFields()[0].src.array.getArray()[0].cmp).toEqual('b');
  });

  it('should push same element in array if equal', () => {
    let srcJSON = {array: ['a']};
    let cmpJSON = {array: ['a']};

    let outputNode = compare(srcJSON, cmpJSON);

    expect(outputNode.getFields().length).toEqual(1);
    expect(outputNode.getFields()[0].tag).toEqual('SAME');
    expect(outputNode.getFields()[0].src.array instanceof ArrayNode).toEqual(true);
    expect(outputNode.getFields()[0].src.array.getArray()[0].tag).toEqual('SAME');
    expect(outputNode.getFields()[0].src.array.getArray()[0].src).toEqual('a');
    expect(outputNode.getFields()[0].src.array.getArray()[0].cmp).toEqual('a');
  });

  it('should push for elements when the lengths are not the same size', () => {
    let srcJSON = {array: ['a']};
    let cmpJSON = {array: ['a', 'b']};

    let outputNode = compare(srcJSON, cmpJSON);

    expect(outputNode.getFields().length).toEqual(1);
    expect(outputNode.getFields()[0].tag).toEqual('SAME');
    expect(outputNode.getFields()[0].src.array instanceof ArrayNode).toEqual(true);
    expect(outputNode.getFields()[0].src.array.getArray()[0].tag).toEqual('SAME');
    expect(outputNode.getFields()[0].src.array.getArray()[0].src).toEqual('a');
    expect(outputNode.getFields()[0].src.array.getArray()[0].cmp).toEqual('a');
    expect(outputNode.getFields()[0].src.array.getArray()[1].tag).toEqual('POSITIVE');
    expect(outputNode.getFields()[0].src.array.getArray()[1].src).not.toBeDefined();
    expect(outputNode.getFields()[0].src.array.getArray()[1].cmp).toEqual('b');
  });
});


