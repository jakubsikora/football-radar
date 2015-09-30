'use strict';

import React from 'react/addons';
import App from '../assets/js/components/App';

const TestUtils = React.addons.TestUtils;

describe('App', () => {
  let component;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(<App />);
  });

  it('should ...', () => {
    expect(component.getDOMNode().textContent).toMatch(/App/);
  });
});