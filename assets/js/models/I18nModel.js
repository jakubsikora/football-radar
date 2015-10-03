'use strict';

import Backbone from 'backbone';
import _ from 'underscore';

/**
 * I18n model. Used for holding all the translation messages.
 */
class I18nModel extends Backbone.Model {

  /**
   * @constructor I18nModel
   */
  constructor(options) {
    super(options);

    // Add listener for changing locales.
    this.on('change:locale', this.updateLanguage);
    this.cache = [];
  }

  defaults() {
    return {
      locale: null,
      messages: {}
    };
  }

  url() {
    return '/i18n/' + this.get('locale') + '.json';
  }

  parse(response) {
    return {
      messages: response
    };
  }

  /**
   * Event callback for updating the locale. This method will trigger
   * fetch to update the messages based on the current locale.
   * If intial option is passed we are not going to call the fetch, this
   * will be triggered from its origin place.
   *
   * @param {Object} model Current model.
   * @param {String} value New locale.
   * @param {Object} options Event options.
   */
  updateLanguage(model, value, options) {
    if (options.initial) {
      return;
    }

    // Check cache before fetch.
    const cache = this.getFromCache(value);

    if (cache) {
      this.set({ messages: cache.messages });
    } else {
      this.fetch().done(() => {
        this.updateCache();
      });
    }
  }

  /**
   * Update the cache if current resource doesn't exist yet.
   */
  updateCache() {
    const locale = this.get('locale');

    if (!this.getFromCache(locale) && !_.isEmpty(this.get('messages'))) {
      this.cache.push(this.toJSON());
    }
  }

  /**
   * Retrieve cache by given locale.
   * @param {String} locale Given locale for the cache.
   * @return {Object|undefined} Cache by given locale.
   */
  getFromCache(locale) {
    return this.cache.filter(item => {
      return item.locale === locale;
    })[0];
  }
}

/** @type {I18nModel} */
const i18n = new I18nModel();

export default i18n;
