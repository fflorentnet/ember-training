import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'img',
  classNames: 'cover',
  attributeBindings: 'src',
  src: computed('name', function () {
    return `/assets/images/comics/covers/${this.get('name')}.jpg`;
  })
});