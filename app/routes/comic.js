import Route from '@ember/routing/route';

export default Route.extend({
  model (params) {
    return this.store.queryRecord('comic', {slug: params.comic_slug});
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
