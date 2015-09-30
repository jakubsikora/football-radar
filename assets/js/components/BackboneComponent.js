'use strict';

import React from 'react';

/**
 * Get backbone collection connected with the react component listen
 * for collection changes.
 * @constructor
 * @class BackboneComponent
 * @extends {React.Component}
 */
export default class BackboneComponent extends React.Component {
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

    const collection = this.props.collection;

    this.mounted = true;
    collection.on('add change', this.onChange.bind(this));
  }

  /**
   * Function to call when the component was removed to the page.
   */
  componentWillUnmount() {
    const collection = this.props.collection;

    this.mounted = false;

    collection.off(null, null, this.onChange.bind(this));
  }

  /**
   * Listener function called when the backbone collection changes.
   */
  onChange() {
    if (this.mounted) {
      const collection = this.props.collection;

      this.setState({
        'collection': collection
      });
    }
  }
}