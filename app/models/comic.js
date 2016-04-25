import DS from 'ember-data';

export default DS.Model.extend({
  slug: function () {
    let title = this.get('title') || 'new';
    return title.dasherize();
  }.property('title'),

  title: DS.attr('string', {defaultValue: 'new'}),
  scriptwriter: DS.attr('string'),
  illustrator: DS.attr('string'),
  publisher: DS.attr('string'),
  isFavorite: DS.attr('boolean', {defaultValue: false}),
  albums: DS.hasMany('album')
});
