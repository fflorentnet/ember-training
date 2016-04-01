import Component from '@ember/component';

export default Component.extend({
  tagName: 'span',
  classNames: 'btn-fav',
  classNameBindings: 'selected',

  click: function () {
    this.toggleProperty('selected');
  }
});
