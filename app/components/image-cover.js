import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'img',
  classNames: 'cover',
  attributeBindings: 'src',
  src: function () {
    return this.getImagePath(this.get('name'));
  }.property('name'),

  getImagePath(name) {
    return `/assets/images/comics/covers/${name}.jpg`;
  },

  didInsertElement() {
    this._super(...arguments);
    this.$().on('error', () => {
      return this.onError();
    });
  },

  willDestroyElement(){
    this.$().off('error');
  },

  onError() {
    this.$().attr('src', this.getImagePath('default'));
  }
});
