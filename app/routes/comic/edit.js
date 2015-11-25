import Route from '@ember/routing/route';
import Comic from 'ember-training/models/comic';

export default Route.extend({
  afterModel (model) {
    this.set('initialModel', Comic.create(model));
  },

  resetController (controller) {
    controller.set('hasUserSavedOrCancel', false);
  },

  resetComic () {
    this.get('controller.model').reset(this.get('initialModel'));
  },

  actions: {
    save () {
      this.transitionTo('comic');
    },
    cancel () {
      this.resetComic();
      this.transitionTo('comic');
    },
    willTransition (transition) {
      if (this.controller.get('hasUserSavedOrCancel')) {
        return true;
      } else if (confirm('Are you sure you want to abandon progress?')) {
        this.resetComic();
        return true;
      } else {
        transition.abort();
      }
    }
  }
});
