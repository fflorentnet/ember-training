import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'img',
  classNames: 'cover',
  attributeBindings: 'src',
  src: computed('name', function () {
    return this.getImagePath(this.get('name'));
  }),

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
