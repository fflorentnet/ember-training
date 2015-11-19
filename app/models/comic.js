import EmberObject from '@ember/object';

export default EmberObject.extend({
  slug: '',
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
