import Node from '../src/node.jsx';

describe('Node', () => {

  describe('addFieldPositives', () => {
    it('should add fields on Node when cmpJSON has field that srcJSON does not', () => {
      let srcJSON = {};
      let cmpJSON = {key1: 'value1', key2: 'value2'};
      let node = new Node();

      node.addFieldPositives(srcJSON, cmpJSON);

      expect(node.getFields()).toEqual([
        {tag: 'POSITIVE', src: undefined, cmp: {key1: 'value1'}},
        {tag: 'POSITIVE', src: undefined, cmp: {key2: 'value2'}}]);
    });

    it('should not add fields on Node whe srcJSON has field that cmpJSON does not', () => {
      let srcJSON = {key1: 'value1', key2: 'value2'};
      let cmpJSON = {};
      let node = new Node();

      node.addFieldPositives(srcJSON, cmpJSON);

      expect(node.getFields()).toEqual([]);
    });
  });

  describe('compareAndAddNonObjectField', () => {
    it('should add field same if field args across JSON are strictly equal', () => {
      let srcJSON = {key: 'value'};
      let cmpJSON = {key: 'value'};
      let node = new Node();

      node.compareAndAddNonObjectField('key', srcJSON, cmpJSON);

      expect(node.getFields()).toEqual([
        {tag: 'SAME', src: {key: 'value'}, cmp: {key: 'value'}}]);
    });

    it('should add field diff if field args across JSON are strictly not equal', () => {
      let srcJSON = {key: true};
      let cmpJSON = {key: 'value'};
      let node = new Node();

      node.compareAndAddNonObjectField('key', srcJSON, cmpJSON);

      expect(node.getFields()).toEqual([
        {tag: 'DIFF', src: {key: true}, cmp: {key: 'value'}}]);
    });
  });
});