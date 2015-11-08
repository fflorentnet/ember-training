import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    return this.modelFor('comics').findBy('slug', params.comic_slug);
  }
});
