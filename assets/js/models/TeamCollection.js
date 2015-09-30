import Backbone from 'backbone';
import TeamModel from './TeamModel';
import gameCollection from './GameCollection';
import cc from '../constants';

class TeamCollection extends Backbone.Collection {
  constructor(options) {
    super(options);

    this.model = TeamModel;

    this.listenTo(gameCollection, "add", this.updateTable);
  }

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

  updateTable(model) {
    const game = model;
    const homeTeamId = game.get(cc.HOME_TEAM_ID);
    const awayTeamId = game.get(cc.AWAY_TEAM_ID);

    const homeTeam = this.get(homeTeamId);
    const awayTeam = this.get(awayTeamId);

    const homeGoals = game.get(cc.HOME_GOALS);
    const awayGoals = game.get(cc.AWAY_GOALS);

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

    this.sort();
  }

  url() {
    return 'http://localhost:8080/teams';
  }
}

export default TeamCollection;
