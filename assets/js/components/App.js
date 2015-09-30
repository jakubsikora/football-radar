import React from 'react';
import LanguageChanger from './LanguageChanger';
import VideoBG from './VideoBG';
import LeagueTable from './LeagueTable';
import { FormattedMessage } from 'react-intl';
import TeamCollection from '../models/TeamCollection';

const teams = new TeamCollection();

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      simulate: false
    };
  }

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
                  id="premier_league"
                  defaultMessage="{season} English Premier League"
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
              onClick={this.onSimulate.bind(this)}>Simulate!</button>
          }

          <div className="video-overlay"></div>
          <VideoBG simulate={this.state.simulate} />
          <div className="container">
            {this.state.simulate &&
              <LeagueTable collection={teams} simulate={this.state.simulate} />
            }
          </div>
        </div>
      </div>
    );
  }
}
