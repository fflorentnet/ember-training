import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    let askedModel = this.modelFor('comics').findBy('slug', params.comic_slug);

    if (askedModel === undefined) {
      throw new Error("No comic found with slug: " + params.comic_slug);
    }

    return askedModel;
  },
  serialize (model) {
    return {
      comic_slug: model.get('slug')
    };
  },
  actions: {
    favorize () {
      let model = this.modelFor(this.routeName);
      Ember.Logger.debug(model.get('slug'), '- favorite:', model.get('isFavorite'));
    }
  }
});
