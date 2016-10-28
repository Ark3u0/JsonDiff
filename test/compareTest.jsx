import compare from '../src/compare.jsx';
import Node from '../src/node.jsx';

describe('compare', () => {

  it('should return empty Node when srcJSON and cmpJSON are empty objects', () => {
    let srcJSON = {};
    let cmpJSON = {};

    let outputNode = compare(srcJSON, cmpJSON);

    expect(outputNode.getFieldPositives()).toEqual([]);
    expect(outputNode.getFieldNegatives()).toEqual([]);
    expect(outputNode.getFieldSames()).toEqual([]);
    expect(outputNode.getFieldDiffs()).toEqual([]);
  });

  it('should add field positives to Node when cmpJSON has fields srcJSON does not', () => {
    let srcJSON = {};
    let cmpJSON = {string: 'string', number: 123, boolean: true, object: {}, null: null};

    let outputNode = compare(srcJSON, cmpJSON);

    expect(outputNode.getFieldPositives()).toEqual([{string: 'string'}, {number: 123}, {boolean: true}, {object: {}}, {null: null}]);
    expect(outputNode.getFieldNegatives()).toEqual([]);
  });

  it('should add field negatives to Node when srcJSON has field cmpJSON does not', () => {
    let srcJSON = {string: 'string', number: 123, boolean: true, object: {}, null: null};
    let cmpJSON = {};

    let outputNode = compare(srcJSON, cmpJSON);

    expect(outputNode.getFieldPositives()).toEqual([]);
    expect(outputNode.getFieldNegatives()).toEqual([{string: 'string'}, {number: 123}, {boolean: true}, {object: {}}, {null: null}]);
  });

  it('should add field diffs and sames to Node when srcJSON and cmpJSON when Object/Array typing are not equal', () => {
    let srcJSON = {string: 'string1', number: 123, boolean: true, null: null, something: {hi: 'hello'}};
    let cmpJSON = {string: 'string2', number: true, boolean: null, null: null, something: 'hello'};

    let outputNode = compare(srcJSON, cmpJSON);

    expect(outputNode.getFieldSames()).toEqual([{null: null}]);
    expect(outputNode.getFieldDiffs()).toEqual([{string: 'string2'}, {number: true}, {boolean: null}, {something: 'hello'}]);
  });

  it('should invoke compare on child objects when field on srcJSON and cmpJSON both have object typing', () => {
    let srcJSON = {object: {}};
    let cmpJSON= {object: {}};

    let outputNode = compare(srcJSON, cmpJSON);

    expect(outputNode.getFieldSames()).toEqual([{object: new Node()}]);
  });
});


