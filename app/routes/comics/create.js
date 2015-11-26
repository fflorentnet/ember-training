import Route from '@ember/routing/route';
import Comic from 'ember-training/models/comic';

export default Route.extend({
  templateName: 'comic/edit',
  controllerName: 'comic/edit',

  model () {
    let newComic = Comic.create();
    this.modelFor('comics').pushObject(newComic);
    return newComic;
  },

  resetController (controller) {
    controller.set('hasUserSavedOrCancel', false);
  },

  resetComic () {
    this.modelFor('comics').removeObject(this.get('controller.model'));
  },

  actions: {
    save () {
      this.transitionTo('comic', this.get('controller.model'));
    },
    cancel () {
      this.resetComic();
      this.transitionTo('comics');
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
