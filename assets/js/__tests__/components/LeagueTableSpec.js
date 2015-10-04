'use strict';

import React from 'react/addons';
import LeagueTable from '../../components/LeagueTable';
import {injectIntl} from 'react-intl';
const i18nLeagueTable = injectIntl(LeagueTable);

const TestUtils = React.addons.TestUtils;

describe('LeagueTable ', () => {
  let component;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(<i18nLeagueTable />);
  });

  it('should render', () => {
    expect(component).not.toBe(null);
  });
});