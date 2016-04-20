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
      this.get('controller.model').save().then(() => {
        this.transitionTo('comic');
      });
    },
    cancel () {
      this.get('controller.model').rollbackAttributes();
      this.transitionTo('comic');
    },
    willTransition (transition) {
      if (this.get('controller.model.hasDirtyAttributes')) {
        if (confirm('Are you sure you want to abandon progress?')) {
          this.get('controller.model').rollbackAttributes();
        } else {
          transition.abort();
        }
      }
    }
  }
});
