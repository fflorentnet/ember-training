import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  title: DS.attr('string'),
  publicationDate     : DS.attr('pubDate'),
  number              : DS.attr('number'),
  coverName           : DS.attr('string', {defaultValue: 'default.jpg'}),
  
  coverUrl: computed ('coverName', function() {
    return '/assets/images/albums/covers/' + this.get('coverName');
  })
});
