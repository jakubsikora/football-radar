'use strict';

import React from 'react';
import LanguageChanger from './LanguageChanger';
import VideoBG from './VideoBG';
import LeagueTable from './LeagueTable';
import Intl from 'intl';
import { defineMessages, FormattedMessage } from 'react-intl';
import TeamCollection from '../models/TeamCollection';

// Instantiate teaam collection
const teams = new TeamCollection();

// Messages
const messages = defineMessages({
  premierLeague: {
    id: 'premier_league',
    defaultMessage: '{season} English Premier League'
  },
  simulate: {
    id: 'simulate',
    defaultMessage: 'Simulate'
  }
});

/**
 * Main app component.
 */
export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    // Set initial states.
    this.state = {
      simulate: false
    };
  }

  /**
   * Handler for starting a simulation.
   * @param {Object} e Mouse event.
   */
  onSimulate(e) {
    e.preventDefault();
    this.setState({simulate: true});
  }

  render() {
    return (
      <div>
        <div className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">
                <FormattedMessage
                  {...messages.premierLeague}
                  values={{
                    season: '2011/12'
                  }}/>
              </a>
            </div>
            <div className="pull-right">
              <p className="navbar-right navbar-text">
                <LanguageChanger />
              </p>
            </div>

          </div>
        </div>

        <div className="intro-header">
          {!this.state.simulate &&
            <button
              className="btn btn-success btn-simulate"
              type="button"
              onClick={this.onSimulate.bind(this)}>
                <FormattedMessage {...messages.simulate} />
            </button>
          }

          <div className="video-overlay"></div>
          <VideoBG simulate={this.state.simulate} />
          <div className="container">
            {this.state.simulate &&
              <LeagueTable
                collection={teams}
                simulate={this.state.simulate} />
            }
          </div>
        </div>
      </div>
    );
  }
}
