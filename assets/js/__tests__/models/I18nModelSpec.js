'use strict';

import i18nModel from '../../models/I18nModel';
import $ from 'jquery';

const mock = {
  locale: 'foo',
  messages: {
    foo: 'bar'
  }
};

describe('i18nModel', () => {
  beforeEach(() => {
    i18nModel.set({locale: null});
    i18nModel.set({messages: {}});
  });

  it('should have defaults settings', () => {
    expect(i18nModel.get('locale')).toBe(null);
    expect(i18nModel.get('messages')).toEqual({});
  });

  it('should have working custom url method', () => {
    i18nModel.set({locale: 'foo'});
    expect(i18nModel.url()).toBe('/i18n/foo.json');
  });

  it('should have working custom parse method', () => {
    expect(i18nModel.parse('foo')).toEqual({
      messages: 'foo'
    });
  });

  describe('updateLanguage method', () => {
    it('should return undefined on initial call', () => {
      const returnVal = i18nModel.updateLanguage({}, null, { initial: true });
      expect(returnVal).toBe(undefined);
    });

    it('should use cache', () => {
      const options = {
        initial: false
      };

      spyOn(i18nModel, 'getFromCache').and.returnValue({
        messages: mock.messages
      });

      i18nModel.updateLanguage({}, null, options);
      expect(i18nModel.get('messages')).toBe(mock.messages);
    });

    it('shouldnt use cache', () => {
      const options = {
        initial: false
      };

      spyOn(i18nModel, 'getFromCache').and.returnValue(null);
      const spyFetch = spyOn(i18nModel, 'fetch').and.returnValue({
        done: () => {}
      });

      i18nModel.updateLanguage({}, null, options);
      expect(spyFetch).toHaveBeenCalled();
    })
  });

  describe('updateCache method', () => {
    it('should cache data', () => {
      i18nModel.set({locale: mock.locale});
      i18nModel.set({messages: mock.messages});
      i18nModel.updateCache();
      expect(i18nModel.cache[0]).toEqual(i18nModel.toJSON());
    });

    it('shouldnt cache ', () => {
      i18nModel.cache = [];
      i18nModel.updateCache();
      expect(i18nModel.cache.length).toBe(0);
    });
  });

  describe('when it fetches', () => {
    let config;

    beforeEach(() => {
      spyOn($, 'ajax').and.callFake((options) => {
        options.success(mock.messages);
      });

      i18nModel.fetch();
    });

    it('should set model properties', () => {
      expect(i18nModel.get('messages')).toEqual(mock.messages);
    });
  });
});
