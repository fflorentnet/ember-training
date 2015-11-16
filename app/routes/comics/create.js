import Route from '@ember/routing/route';
import Comic from 'ember-training/models/comic';

export default Route.extend({
  model () {
    let newComic = Comic.create({'slug': 'new'});
    this.modelFor('comics').pushObject(newComic);
    return newComic;
  }
});
