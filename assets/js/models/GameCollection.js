import Backbone from 'backbone';
import BaseStreamableCollection from './BaseStreamableCollection';
import GameModel from './GameModel';
import cc from '../constants';

class GameCollection extends BaseStreamableCollection {
  constructor(options) {
    super(options);

    this.WSHost = 'ws://localhost:8080/';
    this.channel = cc.CH_GAMES;
    this.model = GameModel;
  }
}

export default new GameCollection();
