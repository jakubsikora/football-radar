'use strict';

import React from 'react';
import I18nModel from '../models/I18nModel';

/**
 * Get backbone model connected with the react component listen
 * for model changes.
 * @constructor
 * @class I18n
 * @extends {React.Component}
 */
export default class I18n extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.mounted = false;
  }

  /**
   * Function to call when the component was added to the page.
   */
  componentDidMount() {
    if (this.mounted) {
      return;
    }

    this.mounted = true;
    I18nModel.on('change:messages', this.onChange.bind(this));
  }

  /**
   * Function to call when the component was removed to the page.
   */
  componentWillUnmount() {
    this.mounted = false;
    I18nModel.off(null, null, this.onChange.bind(this));
  }

  /**
   * Listener function called when the backbone model changes.
   */
  onChange() {
    if (this.mounted) {
      this.forceUpdate();
    }
  }
}