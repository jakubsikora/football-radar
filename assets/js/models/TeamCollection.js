import Backbone from 'backbone';
import TeamModel from './TeamModel';
import gameCollection from './GameCollection';
import configModel from './ConfigModel';
import cc from '../constants';

/**
 * Team collection.
 */
class TeamCollection extends Backbone.Collection {
  constructor(options) {
    super(options);
    this.model = TeamModel;

    // Add event listener for new addition of game models.
    this.listenTo(gameCollection, "add", this.updateTable);
  }

  /**
   * Custom comparator, sort by points, goals difference, goals For, team name.
   * @param  {object} a Team model a.
   * @param  {object} b Team model b.
   * @return {number}   comporator identifier.
   */
  comparator(a, b) {
    const points = b.get(cc.PTS) - a.get(cc.PTS);

    if (points === 0) {
      const goalDiffA = a.get(cc.GF) - a.get(cc.GF);
      const goalDiffB = b.get(cc.GA) - b.get(cc.GA);
      const goalDiff = goalDiffB - goalDiffA;

      if (goalDiff === 0) {
        const goalsA = a.get(cc.GF);
        const goalsB = b.get(cc.GF);
        const goals = goalsB - goalsA;

        if (goals === 0) {
          return a.get(cc.NAME) < b.get(cc.NAME) ? -1 : 1;
        } else {
          return goals;
        }
      } else {
        return goalDiff;
      }
    } else {
      return points;
    }
  }

  /**
   * Update table, based on new game model.
   * @param  {[type]} model [description]
   * @return {[type]}       [description]
   */
  updateTable(model) {
    const game = model;

    // Get teams id.
    const homeTeamId = game.get(cc.HOME_TEAM_ID);
    const awayTeamId = game.get(cc.AWAY_TEAM_ID);

    // Get teams model.
    const homeTeam = this.get(homeTeamId);
    const awayTeam = this.get(awayTeamId);

    // Get teams goals.
    const homeGoals = game.get(cc.HOME_GOALS);
    const awayGoals = game.get(cc.AWAY_GOALS);

    // Calculate points based on winner.
    if (homeGoals > awayGoals) {
      homeTeam.increase(cc.WIN);
      awayTeam.increase(cc.LOSE);
      homeTeam.increase(cc.PTS, 3);
    } else if (homeGoals < awayGoals) {
      homeTeam.increase(cc.LOSE);
      awayTeam.increase(cc.WIN);
      awayTeam.increase(cc.PTS, 3);
    } else {
      homeTeam.increase(cc.DRAW);
      awayTeam.increase(cc.DRAW);
      homeTeam.increase(cc.PTS, 1);
      awayTeam.increase(cc.PTS, 1);
    }

    homeTeam.increase(cc.MATCHES);
    awayTeam.increase(cc.MATCHES);

    homeTeam.increase(cc.GF, homeGoals);
    homeTeam.increase(cc.GA, awayGoals);
    awayTeam.increase(cc.GF, awayGoals);
    awayTeam.increase(cc.GA, homeGoals);

    // Sort table.
    this.sort();
  }

  url() {
    return 'http://' + configModel.get('WS_HOST') + ':' + configModel.get('WS_PORT') + '/teams';
  }
}

export default TeamCollection;
