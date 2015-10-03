'use strict';

import React from 'react';
import I18nModel from '../models/I18nModel.js';
import { defineMessages, FormattedMessage } from 'react-intl';

// Messages
const messages = defineMessages({
  en: {
    id: 'language.en',
    defaultMessage: 'EN'
  },
  pl: {
    id: 'language.pl',
    defaultMessage: 'PL'
  },
});

/**
 * Component for changing language.
 */
export default class LanguageChanger extends React.Component {

  /**
   * Handler for updating app language.
   * @param {Object} e Mouse event.
   */
  onChange(e) {
    I18nModel.set({ 'locale': e.target.value });
  }

  render() {
    return (
      <select
        defaultValue={I18nModel.get('locale')}
        onChange={this.onChange.bind(this)}>
          <option value="en-UK">
            <FormattedMessage {...messages.en} />
          </option>
          <option value="pl-PL">
            <FormattedMessage {...messages.pl} />
          </option>
      </select>
    )
  }
}
