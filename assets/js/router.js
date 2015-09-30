import '../css/football-radar.less';

import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import AppIntl from './components/AppIntl';
import NoMatch from './components/NoMatch';

React.render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={AppIntl}>
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>
), document.getElementById('app'));
