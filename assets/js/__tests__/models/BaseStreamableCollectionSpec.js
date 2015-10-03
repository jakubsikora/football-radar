'use strict';

import BaseStreamableCollection from '../../models/BaseStreamableCollection';
let baseStreamableCollection;

describe('BaseStreamableCollection', () => {
  beforeEach(() => {
    baseStreamableCollection = new BaseStreamableCollection();
  });

  it('should have defined stream method', () => {
    expect(baseStreamableCollection.stream).toBeDefined();
  });
});
