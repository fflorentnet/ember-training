import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  classNames: 'btn-fav',
  classNameBindings: 'selected',

  click: function () {
    this.toggleProperty('selected');
  }
});
