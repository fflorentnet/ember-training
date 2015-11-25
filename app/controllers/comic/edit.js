import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    save() {
      this.set('hasUserSavedOrCancel', true);
      return true;
    },

    cancel() {
      this.set('hasUserSavedOrCancel', true);
      return true;
    }
  }
});
