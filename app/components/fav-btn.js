import Component from '@ember/component';

export default Component.extend({
  tagName: 'span',
  classNames: 'btn-fav',
  classNameBindings: 'selected',

  click() {
    this.toggleProperty('selected');
    // eslint-disable-next-line ember/closure-actions
    this.sendAction();
  }
});
