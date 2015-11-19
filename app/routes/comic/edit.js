import Route from '@ember/routing/route';
import Comic from 'ember-training/models/comic';

export default Route.extend({
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
