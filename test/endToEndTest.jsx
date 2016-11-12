import Index from '../src/index.jsx';
import { shallow } from 'enzyme';
import React from 'react';

describe("endToEndTest", () => {
  const inputData = {
    srcValue: '{"field_different": "one thing", "field_negative": 2, "field_same": null, "object_same": {"field_different": "one thing", "field_negative": 2, "field_same": null}, "array_same": ["same", "different1"]}',
    cmpValue: '{"field_different": "another thing", "field_same": null, "field_positive": true, "object_same": {"field_different": "another thing", "field_positive": true, "field_same": null}, "object_different": {"array": [], "object": {}, "number": 123}, "array_different": [123,[],{}], "array_same": ["same", "different2", "added"]}'
  };

  it('should render the expected diff for valid JSON input', () => {
    const wrapper = shallow(<Index/>);
    let index = wrapper.instance();

    // Set input
    index.setState(inputData);

    // Render
    const updatedWrapper = shallow(index.render());

    // Test output
    expect(updatedWrapper.html()).toEqual('<div id="index">' +
        '<input placeholder="source JSON" value="{&quot;field_different&quot;: &quot;one thing&quot;, &quot;field_negative&quot;: 2, &quot;field_same&quot;: null, &quot;object_same&quot;: {&quot;field_different&quot;: &quot;one thing&quot;, &quot;field_negative&quot;: 2, &quot;field_same&quot;: null}, &quot;array_same&quot;: [&quot;same&quot;, &quot;different1&quot;]}"/>' +
        '<input placeholder="compare JSON" value="{&quot;field_different&quot;: &quot;another thing&quot;, &quot;field_same&quot;: null, &quot;field_positive&quot;: true, &quot;object_same&quot;: {&quot;field_different&quot;: &quot;another thing&quot;, &quot;field_positive&quot;: true, &quot;field_same&quot;: null}, &quot;object_different&quot;: {&quot;array&quot;: [], &quot;object&quot;: {}, &quot;number&quot;: 123}, &quot;array_different&quot;: [123,[],{}], &quot;array_same&quot;: [&quot;same&quot;, &quot;different2&quot;, &quot;added&quot;]}"/>' +
        '<div id="output">' +
          '<div style="font-weight:bold;">Output:</div>' +
          '<ul style="list-style-type:none;">{' +
            '<li style="background-color:#F47B7B;padding-left:40px;">field_different: <span style="font-weight:bold;color:green;">&quot;one thing&quot;</span></li>' +
            '<li style="background-color:#0EFF6A;padding-left:40px;">field_different: <span style="font-weight:bold;color:green;">&quot;another thing&quot;</span></li>' +
            '<li style="background-color:#F47B7B;padding-left:40px;">field_negative: <span style="color:blue;">2</span></li>' +
            '<li style="padding-left:40px;">field_same: <span style="font-weight:bold;color:purple;">null</span></li>' +
            '<li style="padding-left:40px;">object_same: {' +
              '<ul style="list-style-type:none;">' +
                '<li style="background-color:#F47B7B;">field_different: <span style="font-weight:bold;color:green;">&quot;one thing&quot;</span></li>' +
                '<li style="background-color:#0EFF6A;">field_different: <span style="font-weight:bold;color:green;">&quot;another thing&quot;</span></li>' +
                '<li style="background-color:#F47B7B;">field_negative: <span style="color:blue;">2</span></li>' +
                '<li>field_same: <span style="font-weight:bold;color:purple;">null</span></li>' +
                '<li style="background-color:#0EFF6A;">field_positive: <span style="font-weight:bold;color:blue;">true</span></li>' +
              '</ul>}' +
            '</li>' +
            '<li style="padding-left:40px;">array_same: [' +
              '<ul style="list-style-type:none;">' +
                '<li><span style="font-weight:bold;color:green;">&quot;same&quot;</span></li>' +
                '<li style="background-color:#F47B7B;"><span style="font-weight:bold;color:green;">&quot;different1&quot;</span></li>' +
                '<li style="background-color:#0EFF6A;"><span style="font-weight:bold;color:green;">&quot;different2&quot;</span></li>' +
                '<li style="background-color:#0EFF6A;"><span style="font-weight:bold;color:green;">&quot;added&quot;</span></li>' +
              '</ul>]' +
            '</li>' +
            '<li style="background-color:#0EFF6A;padding-left:40px;">field_positive: <span style="font-weight:bold;color:blue;">true</span></li>' +
            '<li style="background-color:#0EFF6A;padding-left:40px;">object_different: {' +
              '<ul style="list-style-type:none;">' +
                '<li style="background-color:#0EFF6A;">array: [' +
                  '<ul style="list-style-type:none;">' +
                  '</ul>]' +
                '</li>' +
                '<li style="background-color:#0EFF6A;">object: {' +
                  '<ul style="list-style-type:none;">' +
                  '</ul>}' +
                '</li>' +
                '<li style="background-color:#0EFF6A;">number: <span style="color:blue;">123</span></li>' +
              '</ul>}' +
            '</li>' +
            '<li style="background-color:#0EFF6A;padding-left:40px;">array_different: [' +
              '<ul style="list-style-type:none;">' +
                '<li style="background-color:#0EFF6A;"><span style="color:blue;">123</span></li>' +
                '<li style="background-color:#0EFF6A;">[<ul style="list-style-type:none;">' +
              '</ul>]' +
            '</li>' +
            '<li style="background-color:#0EFF6A;">{' +
              '<ul style="list-style-type:none;">' +
              '</ul>}' +
            '</li>' +
          '</ul>]' +
        '</li>}' +
      '</ul>' +
    '</div>' +
    '</div>');
  });
});