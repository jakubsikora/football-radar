'use strict';

import TeamCollection from '../../models/TeamCollection';
import cc from '../../constants';
import GameModel from '../../models/GameModel';

let teamCollection;

const mockTeams = [{
  id: 1,
  name: 'foo'
}, {
  id: 2,
  name: 'bar'
}];

const mockGames = [];
mockGames[0] = {};
mockGames[0][cc.HOME_TEAM_ID] = 1;
mockGames[0][cc.AWAY_TEAM_ID] = 2;
mockGames[0][cc.HOME_GOALS] = 1;
mockGames[0][cc.AWAY_GOALS] = 0;
mockGames[1] = {};
mockGames[1][cc.HOME_TEAM_ID] = 1;
mockGames[1][cc.AWAY_TEAM_ID] = 2;
mockGames[1][cc.HOME_GOALS] = 0;
mockGames[1][cc.AWAY_GOALS] = 2;

describe('TeamCollection', () => {
  beforeEach(() => {
    teamCollection = new TeamCollection();
    teamCollection.set(mockTeams);
  });

  it('should have working updateTable method', () => {
    const game1 = new GameModel(mockGames[0]);
    const game2 = new GameModel(mockGames[1]);
    const team1 = teamCollection.get(1);
    const team2 = teamCollection.get(2);
    teamCollection.updateTable(game1);
    expect(teamCollection.at(0).get('id')).toBe(mockTeams[0].id);
    expect(team1.get(cc.PTS)).toBe(3);
    expect(team2.get(cc.PTS)).toBe(0);
    teamCollection.updateTable(game2);
    expect(teamCollection.at(0).get('id')).toBe(mockTeams[1].id);
    expect(team1.get(cc.PTS)).toBe(3);
    expect(team2.get(cc.PTS)).toBe(3);
  });
});
