import Backbone from 'backbone';

/**
 * Game model.
 */
class GameModel extends Backbone.Model {
  constructor(options) {
    super(options);
  }

  defaults() {
    return {
      date: null,
      homeTeamId: null,
      awayTeamId: null,
      homeGoals: 0,
      awayGoals: 0
    }
  }
}

export default GameModel;
