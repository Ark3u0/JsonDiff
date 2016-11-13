import Node from '../src/node.jsx';
import { shallow } from 'enzyme';
import React from 'react';

describe('Node', () => {
  describe('writeValue', () => {
    it('should write an escaped string and style it bold green', () => {
      let node = new Node();
      const wrapper = shallow(node.writeValue("a string"));
      expect(wrapper.html()).toEqual('<span style="font-weight:bold;color:green;">&quot;a string&quot;</span>')
    });

    it('should write a boolean and style it bold blue', () => {
      let node = new Node();
      const wrapper = shallow(node.writeValue(true));
      expect(wrapper.html()).toEqual('<span style="font-weight:bold;color:blue;">true</span>')
    });

    it('should write a null and style it bold purple', () => {
      let node = new Node();
      const wrapper = shallow(node.writeValue(null));
      expect(wrapper.html()).toEqual('<span style="font-weight:bold;color:purple;">null</span>')
    });

    it('should write a number and style it blue', () => {
      let node = new Node();
      const wrapper = shallow(node.writeValue(123));
      expect(wrapper.html()).toEqual('<span style="color:blue;">123</span>')
    });

    it('should call render on an object node with fields', () => {
      let node = new Node();
      let objectNode = {
        render: () => {},
        nodeType: "ObjectNode",
        getFields: () => { return ["length_greater_than_0"]; }
      };

      spyOn(objectNode, 'render');

      node.writeValue(objectNode);
      expect(objectNode.render).toHaveBeenCalled();
    });

    it('should return null when writing an object node without fields', () => {
      let node = new Node();
      let objectNode = {
        render: () => {},
        nodeType: "ObjectNode",
        getFields: () => { return []; }
      };

      spyOn(objectNode, 'render');

      expect(node.writeValue(objectNode)).toEqual(null);
      expect(objectNode.render).not.toHaveBeenCalled();
    });

    it('should call render on an array node', () => {
      let node = new Node();
      let arrayNode = {
        render: () => {},
        nodeType: "ArrayNode",
        getArray: () => { return ["length_greater_than_0"]; }
      };

      spyOn(arrayNode, 'render');

      node.writeValue(arrayNode);
      expect(arrayNode.render).toHaveBeenCalled();
    });

    it('should return null when writing an array node without elements', () => {
      let node = new Node();
      let arrayNode = {
        render: () => {},
        nodeType: "ArrayNode",
        getArray: () => { return []; }
      };

      spyOn(arrayNode, 'render');

      expect(node.writeValue(arrayNode)).toEqual(null);
      expect(arrayNode.render).not.toHaveBeenCalled();
    });
  });

  describe('writeLeftBracket/writeRightBracket', () => {
    it('should return empty string if not object/array nodeType', () => {
      let node = new Node();
      expect(node.writeLeftBracket("a string")).toEqual("");
      expect(node.writeRightBracket("a string")).toEqual("");
    });

    it('should return empty string if null', () => {
      let node = new Node();
      expect(node.writeLeftBracket(null)).toEqual("");
      expect(node.writeRightBracket(null)).toEqual("");
    });

    it('should return curly brackets if object nodeType', () => {
      let node = new Node();
      expect(node.writeLeftBracket({nodeType: "ObjectNode"})).toEqual("{");
      expect(node.writeRightBracket({nodeType: "ObjectNode"})).toEqual("}");
    });

    it('should return array brackets if array nodeType', () => {
      let node = new Node();
      expect(node.writeLeftBracket({nodeType: "ArrayNode"})).toEqual("[");
      expect(node.writeRightBracket({nodeType: "ArrayNode"})).toEqual("]");
    });
  });
});