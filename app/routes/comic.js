import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    return this.store.queryRecord('comic', {slug: params.comic_slug});
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
