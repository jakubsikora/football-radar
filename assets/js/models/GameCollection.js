import BaseStreamableCollection from './BaseStreamableCollection';
import GameModel from './GameModel';
import cc from '../constants';

/**
 * Game collection.
 */
class GameCollection extends BaseStreamableCollection {
  constructor(options) {
    super(options);
    this.channel = cc.CH_GAMES;
    this.model = GameModel;
  }
}

// Return instance of game collection (singleton).
export default new GameCollection();
