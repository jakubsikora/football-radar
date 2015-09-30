'use strict';

import React from 'react/addons';
import App from '../../components/App';

const TestUtils = React.addons.TestUtils;

describe('App', () => {
  let component;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(<App />);
  });

  it('should render', () => {
    expect(component).not.toBe(null);
  });
});