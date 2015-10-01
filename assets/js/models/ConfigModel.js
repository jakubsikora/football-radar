import Backbone from 'backbone';

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

export default new ConfigModel();
