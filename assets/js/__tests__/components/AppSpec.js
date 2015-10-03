'use strict';

import React from 'react/addons';
import {intlShape, injectIntl} from 'react-intl';
import AppIntl from '../../components/AppIntl';

const TestUtils = React.addons.TestUtils;

describe('AppIntl', () => {
  let component;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(<AppIntl />);
  });

  it('should render', () => {
    expect(component).not.toBe(null);
  });
});