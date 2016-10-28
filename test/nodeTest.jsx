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

  describe('compareAndAddNonObjectField', () => {

    it('should add field same if field args across JSON are strictly equal', () => {
      let srcJSON = {key: 'value'};
      let cmpJSON = {key: 'value'};
      let node = new Node();

      node.compareAndAddNonObjectField('key', srcJSON, cmpJSON);

      expect(node.getFieldSames()).toEqual([{key: 'value'}]);
      expect(node.getFieldDiffs()).toEqual([]);
    });

    it('should add field same if field args across JSON are strictly equal', () => {
      let srcJSON = {key: true};
      let cmpJSON = {key: 'value'};
      let node = new Node();

      node.compareAndAddNonObjectField('key', srcJSON, cmpJSON);

      expect(node.getFieldSames()).toEqual([]);
      expect(node.getFieldDiffs()).toEqual([{key: 'value'}]);
    });
  });
});