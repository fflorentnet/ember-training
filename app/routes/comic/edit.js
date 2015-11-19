import Ember from 'ember';
import Comic from 'ember-training/models/comic';

export default Ember.Route.extend({
  afterModel (model) {
    this.set('initialModel', Comic.create(model));
  },
  actions: {
    save () {
      this.transitionTo('comic');
    },
    cancel () {
      this.get('controller.model').reset(this.get('initialModel'));
      this.transitionTo('comic');
    }
  }
});
