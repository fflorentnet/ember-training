import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    favorize() {
      this.send('onFavorize');
    }
  }
});
