'use strict';

import GameModel from '../../models/GameModel';

let gameModel;

describe('GameModel', () => {
  beforeEach(() => {
    gameModel = new GameModel();
  });

  it('should have defaults settings', () => {
    expect(gameModel.get('date')).toBe(null);
    expect(gameModel.get('homeTeamId')).toBe(null);
    expect(gameModel.get('awayTeamId')).toBe(null);
    expect(gameModel.get('homeGoals')).toBe(0);
    expect(gameModel.get('awayGoals')).toBe(0);
  });
});
