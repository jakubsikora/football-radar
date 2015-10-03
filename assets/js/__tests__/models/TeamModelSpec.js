'use strict';

import TeamModel from '../../models/TeamModel';

let teamModel;

describe('TeamModel', () => {
  beforeEach(() => {
    teamModel = new TeamModel();
  });

  it('should have defaults settings', () => {
    expect(teamModel.get('id')).toBe(null);
    expect(teamModel.get('name')).toBe(null);
    expect(teamModel.get('matches')).toBe(0);
    expect(teamModel.get('points')).toBe(0);
    expect(teamModel.get('win')).toBe(0);
    expect(teamModel.get('lose')).toBe(0);
    expect(teamModel.get('draw')).toBe(0);
    expect(teamModel.get('goalsFor')).toBe(0);
    expect(teamModel.get('goalsAgainst')).toBe(0);
  });

  it('should have working increase method', () => {
    expect(teamModel.get('points')).toBe(0);
    teamModel.increase('points');
    expect(teamModel.get('points')).toBe(1);
    teamModel.increase('points', 10);
    expect(teamModel.get('points')).toBe(11);
  });
});
