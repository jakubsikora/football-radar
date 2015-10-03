import Backbone from 'backbone';

/**
 * Team model.
 */
class TeamModel extends Backbone.Model {
  constructor(options) {
    super(options);
  }

  /**
   * Default values for the model.
   */
  defaults() {
    return {
      id: null,
      name: null,
      matches: 0,
      points: 0,
      win: 0,
      lose: 0,
      draw: 0,
      goalsFor: 0,
      goalsAgainst: 0
    }
  }

  /**
   * Increase model property by given value.
   * @param {string} prop Model property.
   * @param {number} byValue Value for which given property will be increased.
   */
  increase(prop, byValue = null) {
    const current = this.get(prop);
    let increment = 1;

    if (byValue) {
      increment = parseInt(byValue, 10);
    }

    let setting = {};
    setting[prop] = current + increment;
    this.set(setting);
  }
}

export default TeamModel;
