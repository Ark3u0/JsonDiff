import ErroneousInputMessage from '../src/erroneousInputMessage.jsx';
import { shallow } from 'enzyme';
import React from 'react';

describe('ErroneousInputMessage', () => {

  it('should not render the error message when inputToBeDefined is defined', () => {
    const wrapper = shallow(<ErroneousInputMessage inputToBeDefined={"is_defined"} errorMessage="ERROR"/>);
    expect(wrapper.html()).toEqual('<div class="errorMessage"></div>');
  });

  it('should render the error message when inputToBeDefined is undefined', () => {
    const wrapper = shallow(<ErroneousInputMessage errorMessage="ERROR"/>);
    expect(wrapper.html()).toEqual('<div class="errorMessage">ERROR</div>');
  });

});


