import { computed } from '@ember/object';
import DS from 'ember-data';

export default DS.Model.extend({
  slug: computed('title', function() {
    const title = this.get('title') || 'new';
    return title.dasherize();
  }),
  
  title: DS.attr('string'),
  scriptwriter: DS.attr('string'),
  illustrator: DS.attr('string'),
  publisher: DS.attr('string'),
  isFavorite: DS.attr('boolean', {defaultValue: false}),

  reset(comic) {
    this.set('title', comic.get('title'));
    this.set('scriptwriter', comic.get('scriptwriter'));
    this.set('illustrator', comic.get('illustrator'));
    this.set('publisher', comic.get('publisher'));
    this.set('isFavorite', comic.get('isFavorite'));
  }
});
