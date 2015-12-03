import Ember from 'ember';

export default Ember.Controller.extend({
  filter: "",
  sortAsc: true,

  filteredComics: Ember.computed.filter('model', function (model) {
    let title = model.get('title');
    return !title || title.toLowerCase().match(new RegExp(this.get('filter').toLowerCase()));
  }).property('filter', 'model.[]', 'model.@each.title'),

  sortDefinition: function () {
    return ["title:" + (this.get('sortAsc') ? 'asc' : 'desc')];
  }.property('sortAsc'),

  sortedComics: Ember.computed.sort('filteredComics', 'sortDefinition'),

  actions: {
    sort () {
      this.toggleProperty('sortAsc');
    }
  }
});
