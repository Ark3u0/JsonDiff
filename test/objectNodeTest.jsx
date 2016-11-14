import ObjectNode from '../src/objectNode.jsx';
import { shallow } from 'enzyme';
import React from 'react';

describe('ObjectNode', () => {
  let pushTag;

  beforeEach(() => {
    pushTag = jasmine.createSpy("pushTag").and.callFake((tag, field) => { return field; });
  });

  describe('render', () => {
    it('should render an empty list', () => {
      const wrapper = shallow(<ObjectNode pushTag={pushTag}/>);
      expect(wrapper.html()).toEqual('<ul></ul>');
    });

    it('should render diff, same, negative, and positive with padding and top brackets', () => {
      const wrapper = shallow(<ObjectNode pushTag={pushTag} isTop={true}/>);
      let objectNode = wrapper.instance();

      objectNode.addFieldSame("same", 1);
      objectNode.addFieldNegative("negative", 2);
      objectNode.compareAndAddNonObjectField("diff", {diff: 3}, {diff: 4});
      objectNode.addFieldPositives({}, {positive: 5});

      const updatedWrapper = shallow(objectNode.render());
      expect(updatedWrapper.html()).toEqual('<ul>' +
        '{' +
          '<li class="same" style="padding-left:40px;">same: <span class="number">1</span>,</li>' +
          '<li class="removed" style="padding-left:40px;">negative: <span class="number">2</span>,</li>' +
          '<li class="removed" style="padding-left:40px;">diff: <span class="number">3</span>,</li>' +
          '<li class="added" style="padding-left:40px;">diff: <span class="number">4</span>,</li>' +
          '<li class="added" style="padding-left:40px;">positive: <span class="number">5</span></li>' +
        '}' +
        '</ul>');
    });

    it('should render diff, same, negative, and positive', () => {
      const wrapper = shallow(<ObjectNode pushTag={pushTag}/>);
      let objectNode = wrapper.instance();

      objectNode.addFieldSame("same", 1);
      objectNode.addFieldNegative("negative", 2);
      objectNode.compareAndAddNonObjectField("diff", {diff: 3}, {diff: 4});
      objectNode.addFieldPositives({}, {positive: 5});

      const updatedWrapper = shallow(objectNode.render());
      expect(updatedWrapper.html()).toEqual('<ul>' +
          '<li class="same">same: <span class="number">1</span>,</li>' +
          '<li class="removed">negative: <span class="number">2</span>,</li>' +
          '<li class="removed">diff: <span class="number">3</span>,</li>' +
          '<li class="added">diff: <span class="number">4</span>,</li>' +
          '<li class="added">positive: <span class="number">5</span></li>' +
        '</ul>');
    });
  });

  it('should add negative field', () => {
    const wrapper = shallow(<ObjectNode pushTag={pushTag}/>);
    let objectNode = wrapper.instance();

    objectNode.addFieldNegative("should_add_negative", "field");

    expect(objectNode.getFields()).toEqual([{tag: 'NEGATIVE', key: 'should_add_negative', src: 'field', cmp: undefined}]);
  });

  it('should add field', () => {
    const wrapper = shallow(<ObjectNode pushTag={pushTag}/>);
    let objectNode = wrapper.instance();

    objectNode.addField("POSITIVE", "should_add_positive", "field");
    objectNode.addField("NEGATIVE", "should_add_negative", "field");

    expect(objectNode.getFields()).toEqual([
      {tag: 'POSITIVE', key: 'should_add_positive', src: undefined, cmp: 'field'},
      {tag: 'NEGATIVE', key: 'should_add_negative', src: 'field', cmp: undefined}
    ]);
  });

  describe('addFieldPositives', () => {
    it('should add fields on ObjectNode when cmpJSON has field that srcJSON does not', () => {
      let srcJSON = {};
      let cmpJSON = {key1: 'value1', key2: 'value2'};
      const wrapper = shallow(<ObjectNode pushTag={pushTag}/>);

      let objectNode = wrapper.instance();

      objectNode.addFieldPositives(srcJSON, cmpJSON);

      expect(objectNode.getFields()).toEqual([
        {tag: 'POSITIVE', key: 'key1', src: undefined, cmp: 'value1'},
        {tag: 'POSITIVE', key: 'key2', src: undefined, cmp: 'value2'}]);
      expect(pushTag).toHaveBeenCalledWith("POSITIVE", 'value1');
      expect(pushTag).toHaveBeenCalledWith("POSITIVE", 'value2');
    });

    it('should not add fields on ObjectNode whe srcJSON has field that cmpJSON does not', () => {
      let srcJSON = {key1: 'value1', key2: 'value2'};
      let cmpJSON = {};
      const wrapper = shallow(<ObjectNode pushTag={pushTag}/>);

      let objectNode = wrapper.instance();

      objectNode.addFieldPositives(srcJSON, cmpJSON);

      expect(objectNode.getFields()).toEqual([]);
      expect(pushTag).not.toHaveBeenCalled();
    });
  });

  describe('compareAndAddNonObjectField', () => {
    it('should add field same if field args across JSON are strictly equal', () => {
      let srcJSON = {key: 'value'};
      let cmpJSON = {key: 'value'};
      const wrapper = shallow(<ObjectNode pushTag={pushTag}/>);

      let objectNode = wrapper.instance();

      objectNode.compareAndAddNonObjectField('key', srcJSON, cmpJSON);

      expect(objectNode.getFields()).toEqual([
        {tag: 'SAME', key: 'key', src: 'value', cmp: 'value'}]);
      expect(pushTag).not.toHaveBeenCalled();
    });

    it('should add field diff if field args across JSON are strictly not equal', () => {
      let srcJSON = {key: true};
      let cmpJSON = {key: 'value'};

      const wrapper = shallow(<ObjectNode pushTag={pushTag}/>);

      let objectNode = wrapper.instance();

      objectNode.compareAndAddNonObjectField('key', srcJSON, cmpJSON);

      expect(objectNode.getFields()).toEqual([
        {tag: 'DIFF', key: 'key', src: true, cmp: 'value'}]);
      expect(pushTag).toHaveBeenCalledWith("NEGATIVE", true);
      expect(pushTag).toHaveBeenCalledWith("POSITIVE", 'value');
    });
  });
});