import Ember from 'ember';
import Comic from 'ember-training/models/comic';

export default Ember.Route.extend({
  templateName: 'comic/edit',

  model () {
    let newComic = Comic.create({'slug': 'new'});
    this.modelFor('comics').pushObject(newComic);
    return newComic;
  }
});
