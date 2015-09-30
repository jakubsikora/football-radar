import Backbone from 'backbone';
import BaseStreamableCollection from './BaseStreamableCollection';
import GameModel from './GameModel';
import cc from '../constants';
import config from '../../../config';

class GameCollection extends BaseStreamableCollection {
  constructor(options) {
    super(options);

    this.WSHost = 'ws://' + config.websockets.host + ':' + config.websockets.port + '/';
    this.channel = cc.CH_GAMES;
    this.model = GameModel;
  }
}

export default new GameCollection();
