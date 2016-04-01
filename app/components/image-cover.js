import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'img',
  classNames: 'cover',
  attributeBindings: 'src',
  src: function () {
    return `/assets/images/comics/covers/${this.get('name')}.jpg`;
  }.property('name')
});
