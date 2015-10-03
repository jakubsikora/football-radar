'use strict';

import gameCollection from '../../models/GameCollection';
import BaseStreamableCollection from '../../models/BaseStreamableCollection';

describe('GeamCollection', () => {
  it('should extends BaseStreamableCollection', () => {
    expect(gameCollection instanceof BaseStreamableCollection).toBeTruthy()
  });
});
