import ArrayNode from '../src/arrayNode.jsx';
import { shallow } from 'enzyme';
import React from 'react';

describe('ArrayNode', () => {
  let pushTag;

  beforeEach(() => {
    pushTag = jasmine.createSpy("pushTag").and.callFake((tag, field) => { return field; });
  });

  describe('render', () => {

    it('should render diff, same, negative, and positive with padding and top brackets', () => {
      const wrapper = shallow(<ArrayNode pushTag={pushTag} isTop={true}/>);
      let arrayNode = wrapper.instance();

      arrayNode.pushDiffElem(1, 2);
      arrayNode.pushSameElem(3);
      arrayNode.pushByDifferenceInLength([], [4]);
      arrayNode.pushByDifferenceInLength([5], []);
      arrayNode.pushElement('NEGATIVE', 6);
      arrayNode.pushElement('POSITIVE', 7);

      const updatedWrapper = shallow(arrayNode.render());
      expect(updatedWrapper.html()).toEqual('<ul style="list-style-type:none;">' +
        '[' +
          '<li style="background-color:#F47B7B;padding-left:40px;"><span style="color:blue;">1</span>,</li>' +
          '<li style="background-color:#0EFF6A;padding-left:40px;"><span style="color:blue;">2</span>,</li>' +
          '<li style="padding-left:40px;"><span style="color:blue;">3</span>,</li>' +
          '<li style="background-color:#0EFF6A;padding-left:40px;"><span style="color:blue;">4</span>,</li>' +
          '<li style="background-color:#F47B7B;padding-left:40px;"><span style="color:blue;">5</span>,</li>' +
          '<li style="background-color:#F47B7B;padding-left:40px;"><span style="color:blue;">6</span>,</li>' +
          '<li style="background-color:#0EFF6A;padding-left:40px;"><span style="color:blue;">7</span></li>' +
        ']' +
        '</ul>');
    });

    it('should render diff, same, negative, and positive', () => {
      const wrapper = shallow(<ArrayNode pushTag={pushTag}/>);
      let arrayNode = wrapper.instance();

      arrayNode.pushDiffElem(1, 2);
      arrayNode.pushSameElem(3);
      arrayNode.pushByDifferenceInLength([], [4]);
      arrayNode.pushByDifferenceInLength([5], []);
      arrayNode.pushElement('NEGATIVE', 6);
      arrayNode.pushElement('POSITIVE', 7);

      const updatedWrapper = shallow(arrayNode.render());
      expect(updatedWrapper.html()).toEqual('<ul style="list-style-type:none;">' +
        '<li style="background-color:#F47B7B;"><span style="color:blue;">1</span>,</li>' +
        '<li style="background-color:#0EFF6A;"><span style="color:blue;">2</span>,</li>' +
        '<li><span style="color:blue;">3</span>,</li>' +
        '<li style="background-color:#0EFF6A;"><span style="color:blue;">4</span>,</li>' +
        '<li style="background-color:#F47B7B;"><span style="color:blue;">5</span>,</li>' +
        '<li style="background-color:#F47B7B;"><span style="color:blue;">6</span>,</li>' +
        '<li style="background-color:#0EFF6A;"><span style="color:blue;">7</span></li>' +
      '</ul>');
    });

  });

  describe('pushByDifferenceInLength', () => {

    it('should push that something was taken away (NEGATIVE) if src array is longer than cmp array', () => {
      let srcArray = ['el1', 'el2'];
      let cmpArray = ['el1'];
      const wrapper = shallow(<ArrayNode pushTag={pushTag}/>);

      let arrayNode = wrapper.instance();

      arrayNode.pushByDifferenceInLength(srcArray, cmpArray);

      expect(arrayNode.getArray()).toEqual([{tag: "NEGATIVE", src: 'el2', cmp: undefined}]);
      expect(pushTag).toHaveBeenCalledWith("NEGATIVE", 'el2');
    });

    it('should push that something was added (POSITIVE) if cmp array is longer than src array', () => {
      let srcArray = ['el1'];
      let cmpArray = ['el1', 'el2'];
      const wrapper = shallow(<ArrayNode pushTag={pushTag}/>);

      let arrayNode = wrapper.instance();

      arrayNode.pushByDifferenceInLength(srcArray, cmpArray);

      expect(arrayNode.getArray()).toEqual([{tag: 'POSITIVE', src: undefined, cmp: 'el2' }]);
      expect(pushTag).toHaveBeenCalledWith("POSITIVE", 'el2');
    });

    it('should not push anything if arrays same size', () => {
      let srcArray = ['el1'];
      let cmpArray = ['el1'];
      const wrapper = shallow(<ArrayNode pushTag={pushTag}/>);

      let arrayNode = wrapper.instance();

      arrayNode.pushByDifferenceInLength(srcArray, cmpArray);

      expect(arrayNode.getArray()).toEqual([]);
      expect(pushTag).not.toHaveBeenCalled();
    });

  });

  it('should push element', () => {
    const wrapper = shallow(<ArrayNode pushTag={pushTag}/>);

    let arrayNode = wrapper.instance();

    arrayNode.pushElement('NEGATIVE', 'negative_field');
    arrayNode.pushElement('POSITIVE', 'positive_field');

    expect(arrayNode.getArray()).toEqual([
      {tag: 'NEGATIVE', src: 'negative_field', cmp: undefined},
      {tag: 'POSITIVE', src: undefined, cmp: 'positive_field'}
    ]);
  });

  it('should push that something is different (DIFF)', () => {
    const wrapper = shallow(<ArrayNode pushTag={pushTag}/>);

    let arrayNode = wrapper.instance();

    arrayNode.pushDiffElem('original', 'changed');

    expect(arrayNode.getArray()).toEqual([{tag: 'DIFF', src: 'original', cmp: 'changed'}]);
    expect(pushTag).toHaveBeenCalledWith('NEGATIVE', 'original');
    expect(pushTag).toHaveBeenCalledWith('POSITIVE', 'changed');
  });

  it('should push that something was stayed the same (SAME)', () => {
    const wrapper = shallow(<ArrayNode pushTag={pushTag}/>);

    let arrayNode = wrapper.instance();

    arrayNode.pushSameElem('stayed the same');

    expect(arrayNode.getArray()).toEqual([{tag: 'SAME', src: 'stayed the same', cmp: 'stayed the same'}]);
    expect(pushTag).not.toHaveBeenCalled();
  });
});