import Node from '../src/node.jsx';

describe('Node', () => {

  describe('addFieldPositives', () => {
    it('should add fields on Node when cmpJSON has field that srcJSON does not', () => {
      let srcJSON = {};
      let cmpJSON = {key1: 'value1', key2: 'value2'};
      let node = new Node();

      node.addFieldPositives(srcJSON, cmpJSON);

      expect(node.getFieldPositives()).toEqual([{key1: 'value1'}, {key2: 'value2'}]);
    });

    it('should not add fields on Node whe srcJSON has field that cmpJSON does not', () => {
      let srcJSON = {key1: 'value1', key2: 'value2'};
      let cmpJSON = {};
      let node = new Node();

      node.addFieldPositives(srcJSON, cmpJSON);

      expect(node.getFieldPositives()).toEqual([]);
    });
  });



});