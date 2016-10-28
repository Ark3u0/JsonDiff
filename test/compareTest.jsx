import compare from '../src/compare.jsx';

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

  it('should add field positives on Node', () => {
    let srcJSON = {};
    let cmpJSON = {key1: 'value1', key2: 'value2'};

    let outputNode = compare(srcJSON, cmpJSON);

    expect(outputNode.getFieldPositives()).toEqual([{key1: 'value1'}, {key2: 'value2'}]);
  });

});


