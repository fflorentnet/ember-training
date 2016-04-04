import Route from '@ember/routing/route';

export default Route.extend({
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
    onFavorize () {
      const model = this.modelFor(this.routeName);
      // eslint-disable-next-line no-console
      console.debug(model.get('slug'), '- favorite:', model.get('isFavorite'));
    }
  }
});
