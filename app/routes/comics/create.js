import Ember from 'ember';

export default Ember.Route.extend({
  templateName: 'comic/edit',
  controllerName: 'comic/edit',

  model () {
    return this.store.createRecord('comic');
  },

  resetController (controller) {
    controller.set('hasUserSavedOrCancel', false);
  },

  resetComic () {
    this.modelFor('comics').removeObject(this.get('controller.model'));
  },

  actions: {
    save () {
      this.get('controller.model').save().then(() => {
        this.transitionTo('comic', this.get('controller.model'));
      });
    },
    cancel () {
      this.get('controller.model').rollbackAttributes();
      this.transitionTo('comics');
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