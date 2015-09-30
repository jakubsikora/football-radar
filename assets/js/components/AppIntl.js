'use strict';

import React from 'react';
import { IntlProvider } from 'react-intl';
import App from './App';
import I18n from './I18n';
import I18nModel from '../models/I18nModel.js';

const DEFAULT_LOCALE = 'en-UK';

export default class AppIntl extends I18n {
  constructor(props, context) {
    super(props, context);

    this.state = {
      'ready': false
    };

    this.loadI18n();
  }

  /**
   * Initial translation load.
   */
  loadI18n() {
    // Initial load
    I18nModel.set({'locale': DEFAULT_LOCALE}, { 'initial': true });

    I18nModel.fetch().done(() => {
      this.setState({ 'ready': true });
      I18nModel.updateCache();
    });
  }

  render() {
    if (!this.state['ready']) {
      return null;
    }

    const messages = I18nModel.get('messages');
    const locale = I18nModel.get('locale');

    return (
      <IntlProvider locale={locale} messages={messages}>
        {() => <App {...this.props} />}
      </IntlProvider>
    )
  }
}
