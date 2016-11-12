import pushTag from '../src/pushTag.jsx';

describe('pushTag', () => {
  it('should return object node with fields unpushed if fields do not include objects/arrays', () => {
      let node = pushTag("NEGATIVE", {null: null, string: 'string', number: 123, boolean: true});
      expect(node.getFields()).toEqual([
        {tag: "NEGATIVE", key: 'null', src: null, cmp: undefined},
        {tag: "NEGATIVE", key: 'string', src: 'string', cmp: undefined},
        {tag: "NEGATIVE", key: 'number', src: 123, cmp: undefined},
        {tag: "NEGATIVE", key: 'boolean', src: true, cmp: undefined}
      ]);
  });

  it('should return array node with elements unpushed if fields do not include objects/arrays', () => {
    let node = pushTag("POSITIVE", [null, 'string', 123, true]);
    expect(node.getArray()).toEqual([
      {tag: "POSITIVE", src: undefined, cmp: null},
      {tag: "POSITIVE", src: undefined, cmp: 'string'},
      {tag: "POSITIVE", src: undefined, cmp: 123},
      {tag: "POSITIVE", src: undefined, cmp: true}
    ]);
  });

  it('should push tags into object/array fields for object', () => {
    let node = pushTag("POSITIVE", {object: {field: 'field'}, array: ['element']});
    expect(node.getFields().length).toEqual(2);
    expect(node.getFields()[0].cmp.getFields()).toEqual([{tag: 'POSITIVE', key: 'field', src: undefined, cmp: 'field'}]);
    expect(node.getFields()[1].cmp.getArray()).toEqual([{tag: 'POSITIVE', src: undefined, cmp: 'element'}]);
  });

  it('should push tags into object/array fields for array', () => {
    let node = pushTag("NEGATIVE", [{field: 'field'}, ['element']]);
    expect(node.getArray().length).toEqual(2);
    expect(node.getArray()[0].src.getFields()).toEqual([{tag: 'NEGATIVE', key: 'field', src: 'field', cmp: undefined}]);
    expect(node.getArray()[1].src.getArray()).toEqual([{tag: 'NEGATIVE', src: 'element', cmp: undefined}]);
  });
});