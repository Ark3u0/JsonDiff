import Index from '../src/index.jsx';
import JSONInput from '../src/jsonInput.jsx';

import { shallow } from 'enzyme';
import React from 'react';

describe("endToEndTest", () => {
  const inputData = {
    srcValue: '{"field_different": "one thing", "field_negative": 2, "field_same": null, "object_same": {"field_different": "one thing", "field_negative": 2, "field_same": null}, "array_same": ["same", "different1"]}',
    cmpValue: '{"field_different": "another thing", "field_same": null, "field_positive": true, "object_same": {"field_different": "another thing", "field_positive": true, "field_same": null}, "object_different": {"array": [], "object": {}, "number": 123}, "array_different": [123,[],{}], "array_same": ["same", "different2", "added"]}'
  };

  it('should render the expected diff for valid JSON input', () => {
    const wrapper = shallow(<Index/>);

    // No state set
    expect(wrapper.html()).toEqual('<div id="index">' +
        '<input placeholder="source JSON" value=""/>' +
        '<input placeholder="comparison JSON" value=""/>' +
        '<div class="errorMessage">Source JSON input is invalid.</div>' +
        '<div class="errorMessage">Comparison JSON input is invalid.</div>' +
        '<div id="output">' +
          '<div class="outputHeader">Output:</div>' +
        '</div>' +
      '</div>');

    // Simulate change on inputs to update state
    expect(wrapper.find(JSONInput).length).toEqual(2);

    wrapper.find(JSONInput).first().simulate('change', {target: {value: inputData.srcValue}});
    wrapper.find(JSONInput).last().simulate('change', {target: {value: inputData.cmpValue}});

    expect(wrapper.state().srcValue).toEqual(inputData.srcValue);
    expect(wrapper.state().cmpValue).toEqual(inputData.cmpValue);

    wrapper.update();

    // Verify changes to output html
    expect(wrapper.html()).toEqual('<div id="index">' +
        '<input placeholder="source JSON" value="{&quot;field_different&quot;: &quot;one thing&quot;, &quot;field_negative&quot;: 2, &quot;field_same&quot;: null, &quot;object_same&quot;: {&quot;field_different&quot;: &quot;one thing&quot;, &quot;field_negative&quot;: 2, &quot;field_same&quot;: null}, &quot;array_same&quot;: [&quot;same&quot;, &quot;different1&quot;]}"/>' +
        '<input placeholder="comparison JSON" value="{&quot;field_different&quot;: &quot;another thing&quot;, &quot;field_same&quot;: null, &quot;field_positive&quot;: true, &quot;object_same&quot;: {&quot;field_different&quot;: &quot;another thing&quot;, &quot;field_positive&quot;: true, &quot;field_same&quot;: null}, &quot;object_different&quot;: {&quot;array&quot;: [], &quot;object&quot;: {}, &quot;number&quot;: 123}, &quot;array_different&quot;: [123,[],{}], &quot;array_same&quot;: [&quot;same&quot;, &quot;different2&quot;, &quot;added&quot;]}"/>' +
        '<div class="errorMessage"></div>' +
        '<div class="errorMessage"></div>' +
        '<div id="output">' +
          '<div class="outputHeader">Output:</div>' +
          '<ul>{' +
            '<li class="removed" style="padding-left:40px;">field_different: <span class="string">&quot;one thing&quot;</span>,</li>' +
            '<li class="added" style="padding-left:40px;">field_different: <span class="string">&quot;another thing&quot;</span>,</li>' +
            '<li class="removed" style="padding-left:40px;">field_negative: <span class="number">2</span>,</li>' +
            '<li class="same" style="padding-left:40px;">field_same: <span class="null">null</span>,</li>' +
            '<li class="same" style="padding-left:40px;">object_same: {' +
              '<ul>' +
                '<li class="removed">field_different: <span class="string">&quot;one thing&quot;</span>,</li>' +
                '<li class="added">field_different: <span class="string">&quot;another thing&quot;</span>,</li>' +
                '<li class="removed">field_negative: <span class="number">2</span>,</li>' +
                '<li class="same">field_same: <span class="null">null</span>,</li>' +
                '<li class="added">field_positive: <span class="boolean">true</span></li>' +
              '</ul>},' +
            '</li>' +
            '<li class="same" style="padding-left:40px;">array_same: [' +
              '<ul>' +
                '<li class="same"><span class="string">&quot;same&quot;</span>,</li>' +
                '<li class="removed"><span class="string">&quot;different1&quot;</span>,</li>' +
                '<li class="added"><span class="string">&quot;different2&quot;</span>,</li>' +
                '<li class="added"><span class="string">&quot;added&quot;</span></li>' +
              '</ul>],' +
            '</li>' +
            '<li class="added" style="padding-left:40px;">field_positive: <span class="boolean">true</span>,</li>' +
            '<li class="added" style="padding-left:40px;">object_different: {' +
              '<ul>' +
                '<li class="added">array: [],' +
                '</li>' +
                '<li class="added">object: {},' +
                '</li>' +
                '<li class="added">number: <span class="number">123</span></li>' +
              '</ul>},' +
            '</li>' +
            '<li class="added" style="padding-left:40px;">array_different: [' +
              '<ul>' +
                '<li class="added"><span class="number">123</span>,</li>' +
                '<li class="added">[],' +
                '</li>' +
                '<li class="added">{}' +
                '</li>' +
              '</ul>]' +
          '</li>}' +
        '</ul>' +
      '</div>' +
    '</div>');
  });
});