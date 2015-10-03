import React from 'react';
import {intlShape, injectIntl, defineMessages} from 'react-intl';
import {Table} from 'react-bootstrap'
import BackboneComponent from './BackboneComponent';
import gameCollection from '../models/GameCollection';
import cc from '../constants';

// Messages
const messages = defineMessages({
  pos: {
    id: 'header.pos',
    defaultMessage: 'Pos'
  },
  name: {
    id: 'header.name',
    defaultMessage: 'Name'
  },
  matches: {
    id: 'header.matches',
    defaultMessage: 'M'
  },
  points: {
    id: 'header.points',
    defaultMessage: 'Pts'
  },
  win: {
    id: 'header.win',
    defaultMessage: 'W'
  },
  draw: {
    id: 'header.draw',
    defaultMessage: 'D'
  },
  lose: {
    id: 'header.lose',
    defaultMessage: 'L'
  },
  goalsFor: {
    id: 'header.goalsFor',
    defaultMessage: 'GF'
  },
  goalsAgainst: {
    id: 'header.goalsAgainst',
    defaultMessage: 'GA'
  },
  goalsDifference: {
    id: 'header.goalsDifference',
    defaultMessage: 'GD'
  }
});

/**
 * Component to render the league table.
 */
class LeagueTable extends BackboneComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      ready: false
    };

    // Get team collection reference.
    const teams = this.props.collection;

    // Initial fetch for all teams.
    teams
      .fetch({ silent: true })
      .done((response) => {
        this.setState({ ready: true });

        // Start streaming when app in simulate state.
        if (this.props.simulate) {
          gameCollection.stream();
        }
      });
  }

  /**
   * Render a row based on given model.
   */
  renderRow(headers, teamModel, index, options) {
    const team = teamModel.toJSON();

    // Reset goals.
    let goalsFor = 0;
    let goalsAgainst = 0;
    let goalsDifference = 0;

    // Based on the given header build the row.
    const rowNodes = headers.map((header, i) => {
      let recordNode = null;
      let colClass = null;

      // Render values depends of the header type.
      switch (header.name) {
        case cc.POS:
          recordNode = (index + 1) + '.';
        break;

        // Add extra images for champions/europa league.
        case cc.CUP:
          let imgNode = null;

          if (options.cl) {
            colClass = 'champions_league';
            imgNode = (
              <img src="/images/cl.png" height="18" />
            );
          } else if (options.el) {
            colClass = 'europa_league';
            imgNode = (
              <img src="/images/el.png" height="18" />
            );
          }

          recordNode = (
            <span>{imgNode}</span>
          );
        break;

        // Render goals for.
        case cc.GF:
          goalsFor = team[header.name];
          recordNode = goalsFor;
        break;

        // Render goals against.
        case cc.GA:
          goalsAgainst = team[header.name];
          recordNode = goalsAgainst;
        break;

        // Calculate and render goals difference.
        case cc.GD:
          goalsDifference = goalsFor - goalsAgainst;
          recordNode = goalsDifference;
          goalsFor = 0;
          goalsAgainst = 0;
        break;

        default:
          recordNode = team[header.name];
      }

      return (
          <td key={i} className={colClass}>
            {recordNode}
          </td>
        );
    });

    return rowNodes;
  }

  /**
   * Render header.
   */
  renderHeader(headers) {
    const headerNodes = headers.map((header, i) => {
      return (
        <th key={i}>
          {header.label}
        </th>
      );
    });

    return (
      <thead>
        <tr>
          {headerNodes}
        </tr>
      </thead>
    );
  }

  /**
   * Render table body based on given teams data.
   */
  renderBody(data) {
    // All rows.
    const rows = data.rows;

    // Table header.
    const headers = data.headers;

    const rowsNodes = rows.map((teamModel, i) => {
      const team = teamModel.toJSON();

      const pos = i + 1;
      let classes = '';
      let options = {
        cl: false,
        el: false,
        relegation: false
      };

      // Speficy extra class for champions/europa league or relegation based on
      // the position.
      if (~cc.CHAMPIONS_LEAGUE_POS.indexOf(pos)) {
        classes = 'champions_league';
        options.cl = true;
      } else if (~cc.EUROPA_LEAGUE_POS.indexOf(pos)) {
        classes = 'europa_league';
        options.el = true;
      } else if (~cc.RELEGATION_POS.indexOf(pos)) {
        classes = 'relegation';
        options.relegation = true;
      }

      const rowNodes = this.renderRow(headers, teamModel, i, options);

      return (
        <tr key={i} className={classes}>
          {rowNodes}
        </tr>
      );
    }, this);

    return (
        <tbody>
          {rowsNodes}
        </tbody>
    );
  }

  render() {
    if (!this.state.ready) return null;

    const {formatMessage} = this.props.intl;

    // Build the table data.
    const data = {
        headers: [{
          name: cc.CUP,
          label: ''
        }, {
          name: cc.POS,
          label: formatMessage(messages.pos)
        }, {
          name: cc.NAME,
          label: formatMessage(messages.name)
        }, {
          name: cc.MATCHES,
          label: formatMessage(messages.matches)
        }, {
          name: cc.PTS,
          label: formatMessage(messages.points)
        }, {
          name: cc.WIN,
          label: formatMessage(messages.win)
        }, {
          name: cc.DRAW,
          label: formatMessage(messages.draw)
        }, {
          name: cc.LOSE,
          label: formatMessage(messages.lose)
        }, {
          name: cc.GF,
          label: formatMessage(messages.goalsFor)
        }, {
          name: cc.GA,
          label: formatMessage(messages.goalsAgainst)
        }, {
          name: cc.GD,
          label: formatMessage(messages.goalsDifference)
        }],
        rows: this.props.collection
    };

    return (
      <div>
        <div className="table-overlay"></div>
        <Table className="separate table-league" responsive>
          {this.renderHeader(data.headers)}
          {this.renderBody(data)}
        </Table>
      </div>
    );
  }
}

LeagueTable.propTypes = {
    intl: intlShape.isRequired,
};

export default injectIntl(LeagueTable);