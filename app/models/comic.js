import EmberObject, { computed } from '@ember/object';

export default EmberObject.extend({
  slug: computed('title', function() {
    const title = this.get('title') || 'new';
    return title.dasherize();
  }),

  title: '',
  scriptwriter: '',
  illustrator: '',
  publisher: '',

  reset(comic) {
    this.set('title', comic.get('title'));
    this.set('scriptwriter', comic.get('scriptwriter'));
    this.set('illustrator', comic.get('illustrator'));
    this.set('publisher', comic.get('publisher'));
  }
});
