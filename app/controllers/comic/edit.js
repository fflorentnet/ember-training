import Controller from '@ember/controller';

export default Controller.extend({

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
