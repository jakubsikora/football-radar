import Backbone from 'backbone';

/**
 * Config model.
 */
class ConfigModel extends Backbone.Model {
  constructor(options) {
    super(options);
  }

  defaults() {
    return {
      WS_PORT: null,
      WS_HOST: null,
      SERVER_PORT: null
    };
  }

  url() {
    return '/config.json';
  }
}

// Return singleton of config model.
export default new ConfigModel();
