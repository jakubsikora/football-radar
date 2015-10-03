'use strict';

import configModel from '../../models/ConfigModel';
import $ from 'jquery';

const mock = {
  WS_PORT: '1000',
  WS_HOST: 'foo',
  SERVER_PORT: '1001'
};

describe('ConfigModel', () => {
  it('should have defaults settings', () => {
    expect(configModel.get('WS_PORT')).toBe(null);
    expect(configModel.get('WS_HOST')).toBe(null);
    expect(configModel.get('SERVER_PORT')).toBe(null);
  });

  describe('when it fetches', () => {
    let config;

    beforeEach(() => {
      spyOn($, 'ajax').and.callFake((options) => {
        options.success(mock);
      });

      configModel.fetch();
    });

    it('should set model properties', () => {
      expect(configModel.get('WS_PORT')).toEqual(mock.WS_PORT);
      expect(configModel.get('WS_HOST')).toEqual(mock.WS_HOST);
      expect(configModel.get('SERVER_PORT')).toEqual(mock.SERVER_PORT);
    });
  });
});
