import Backbone from 'backbone';

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
