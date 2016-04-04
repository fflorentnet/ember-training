import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  classNames: 'btn-fav',
  classNameBindings: 'selected',

  click() {
    this.toggleProperty('selected');
    this.sendAction();
  }
});
