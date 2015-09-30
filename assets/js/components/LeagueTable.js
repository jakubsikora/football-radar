import React from 'react';
import { Table } from 'react-bootstrap'
import BackboneComponent from './BackboneComponent';
import gameCollection from '../models/GameCollection';
import cc from '../constants';

export default class LeagueTable extends BackboneComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      ready: false
    };

    const teams = this.props.collection;
    teams
      .fetch({ silent: true })
      .done((response) => {
        this.setState({ 'ready': true });

        if (this.props.simulate) {
          gameCollection.stream();
        }
      });
  }

  renderRow(headers, teamModel, index, options) {
    const team = teamModel.toJSON();
    let goalsFor = 0;
    let goalsAgainst = 0;
    let goalsDifference = 0;

    const rowNodes = headers.map((header, i) => {
      let recordNode = null;
      let colClass = null;

      switch (header.name) {
        case cc.POS:
          recordNode = (index + 1) + '.';
        break;

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

        case cc.GF:
          goalsFor = team[header.name];
          recordNode = goalsFor;
        break;

        case cc.GA:
          goalsAgainst = team[header.name];
          recordNode = goalsAgainst;
        break;

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

  renderBody(data) {
    const rows = data.rows;

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

    const data = {
        headers: [{
          name: cc.CUP,
          label: ''
        }, {
          name: cc.POS,
          label: 'Pos'
        }, {
          name: cc.NAME,
          label: 'Name'
        }, {
          name: cc.MATCHES,
          label: 'M'
        }, {
          name: cc.PTS,
          label: 'Pts'
        }, {
          name: cc.WIN,
          label: 'W'
        }, {
          name: cc.DRAW,
          label: 'D'
        }, {
          name: cc.LOSE,
          label: 'L'
        }, {
          name: cc.GF,
          label: 'GF'
        }, {
          name: cc.GA,
          label: 'GA'
        }, {
          name: cc.GD,
          label: 'GD'
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
