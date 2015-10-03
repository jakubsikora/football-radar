'use strict';

import React from 'react';
import Intl from 'intl';
import { IntlProvider } from 'react-intl';
import configModel from '../models/ConfigModel.js';
import App from './App';
import I18n from './I18n';
import I18nModel from '../models/I18nModel.js';
import cc from '../constants';

/**
 * Main app wrapped with IntlProvider component.
 */
export default class AppIntl extends I18n {
  constructor(props, context) {
    super(props, context);

    // Initial state
    this.state = {
      ready: false
    };

    // Intialize the app config model and load the translation model.
    configModel.fetch().done(() => {
      this.loadI18n();
    });
  }

  /**
   * Initial translation load.
   */
  loadI18n() {
    // Initial load
    I18nModel.set({ locale: cc.DEFAULT_LOCALE }, { initial: true });

    I18nModel.fetch().done(() => {
      this.setState({ ready: true });

      // Update translation cache.
      I18nModel.updateCache();
    });
  }

  render() {
    if (!this.state.ready) {
      return null;
    }

    // Get translation details and pass them to wrapper component.
    const messages = I18nModel.get('messages');
    const locale = I18nModel.get('locale');

    return (
      <IntlProvider locale={locale} messages={messages}>
        {() => <App {...this.props} />}
      </IntlProvider>
    )
  }
}
