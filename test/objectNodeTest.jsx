import ObjectNode from '../src/objectNode.jsx';

describe('ObjectNode', () => {
  const props = {
    pushTag: (tag, field) => { return field; }
  };

  beforeEach(() => {
    spyOn(props, 'pushTag');
  });

  describe('addFieldPositives', () => {
    it('should add fields on ObjectNode when cmpJSON has field that srcJSON does not', () => {
      let srcJSON = {};
      let cmpJSON = {key1: 'value1', key2: 'value2'};
      let node = new ObjectNode(props);

      node.addFieldPositives(srcJSON, cmpJSON);

      expect(node.getFields()).toEqual([
        {tag: 'POSITIVE', key: 'key1', src: undefined, cmp: 'value1'},
        {tag: 'POSITIVE', key: 'key2', src: undefined, cmp: 'value2'}]);
    });

    it('should not add fields on ObjectNode whe srcJSON has field that cmpJSON does not', () => {
      let srcJSON = {key1: 'value1', key2: 'value2'};
      let cmpJSON = {};
      let node = new ObjectNode(props);

      node.addFieldPositives(srcJSON, cmpJSON);

      expect(node.getFields()).toEqual([]);
    });
  });

  describe('compareAndAddNonObjectField', () => {
    it('should add field same if field args across JSON are strictly equal', () => {
      let srcJSON = {key: 'value'};
      let cmpJSON = {key: 'value'};
      let node = new ObjectNode(props);

      node.compareAndAddNonObjectField('key', srcJSON, cmpJSON);

      expect(node.getFields()).toEqual([
        {tag: 'SAME', key: 'key', src: 'value', cmp: 'value'}]);
    });

    it('should add field diff if field args across JSON are strictly not equal', () => {
      let srcJSON = {key: true};
      let cmpJSON = {key: 'value'};
      let node = new ObjectNode(props);

      node.compareAndAddNonObjectField('key', srcJSON, cmpJSON);

      expect(node.getFields()).toEqual([
        {tag: 'DIFF', key: 'key', src: true, cmp: 'value'}]);
    });
  });
});