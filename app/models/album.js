import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  publicationDate     : DS.attr('pubDate'),
  number              : DS.attr('number'),
  coverName           : DS.attr('string', {defaultValue: 'default.jpg'}),
  coverUrl: function() {
    return '/assets/images/albums/covers/' + this.get('coverName');
  }.property('coverName')
});
