import React from 'react';
import I18nModel from '../models/I18nModel.js';
import { FormattedMessage } from 'react-intl';

export default class LanguageChanger extends React.Component {
  onChange(e) {
    I18nModel.set({ 'locale': e.target.value });
  }

  render() {
    return (
      <select
        defaultValue={I18nModel.get('locale')}
        onChange={this.onChange.bind(this)}>
          <option value="en-UK">
            <FormattedMessage id="language.en" defaultMessage="EN" />
          </option>
          <option value="pl-PL">
            <FormattedMessage id="language.pl" defaultMessage="PL" />
          </option>
      </select>
    )
  }
}
