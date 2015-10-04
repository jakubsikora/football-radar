'use strict';

import React from 'react/addons';
import AppIntl from '../../components/AppIntl';
import configModel from '../../models/ConfigModel';

const TestUtils = React.addons.TestUtils;

describe('AppIntl', () => {
  let component;

  beforeEach(() => {
    spyOn(configModel, 'fetch').and.returnValue({
      done: (() => {})
    });
    component = TestUtils.renderIntoDocument(<AppIntl />);
  });

  it('should render', () => {
    expect(component).not.toBe(null);
  });
});