'use strict';

import React from 'react/addons';
import LanguageChanger from '../../components/LanguageChanger';
import {injectIntl} from 'react-intl';
const i18nLanguageChanger = injectIntl(LanguageChanger);

const TestUtils = React.addons.TestUtils;


describe('LanguageChanger', () => {
  let component;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(<i18nLanguageChanger />);
  });

  it('should render', () => {
    expect(component).not.toBe(null);
  });
});