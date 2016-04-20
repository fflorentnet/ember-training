import { computed } from '@ember/object';
import DS from 'ember-data';

export default DS.Model.extend({
  slug: computed('title', function() {
    const title = this.get('title') || 'new';
    return title.dasherize();
  }),
  title: DS.attr('string', {defaultValue: 'new'}),
  scriptwriter: DS.attr('string'),
  illustrator: DS.attr('string'),
  publisher: DS.attr('string'),
  isFavorite: DS.attr('boolean', {defaultValue: false})
});
