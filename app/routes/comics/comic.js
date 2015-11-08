import Route from '@ember/routing/route';

export default Route.extend({
  model (params) {
    return this.modelFor('comics').findBy('slug', params.comic_slug);
  }
});
