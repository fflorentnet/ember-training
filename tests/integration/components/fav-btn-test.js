import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { startMirage } from 'ember-training/initializers/ember-cli-mirage';


let Comic = Ember.Object.extend({
  slug: '',
  title: '',
  scriptwriter: '',
  illustrator: '',
  publisher: '',
  isFavorite: false
});

let akira = Comic.create({
  slug: 'akira',
  title: 'Akira',
  scriptwriter: 'Katsuhiro Otomo',
  illustrator: 'Katsuhiro Otomo',
  publisher: 'Epic Comics',
  isFavorite: false
});

const setupMirage = function(hooks) {
  hooks.beforeEach(function() {
    this.server = startMirage();
  });

  hooks.afterEach(function() {
    this.server.shutdown();
  });
}

module('Integration | Component | fav btn', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('renders fav-btn', async function(assert) {
  
    akira.set('isFavorite', false);
    this.set('model', akira);
  
    await render(hbs`{{fav-btn selected=model.isFavorite}}`);
  
    assert.notEqual(this.element.querySelector('.btn-fav'), null);
    assert.notOk(this.element.querySelector('.btn-fav').classList.contains('selected'));
  });
  
  test('update fav-btn after external change', async function(assert) {
  
    akira.set('isFavorite', false);
    this.set('model', akira);
  
    await render(hbs`{{fav-btn selected=model.isFavorite}}`);
  
    assert.equal(this.element.querySelector('.btn-fav.selected'), null);
  
    Ember.run(() => {
      akira.set('isFavorite', true);
    });
  
    assert.notEqual(this.element.querySelector('.btn-fav.selected'), null);
  });
  
  test('update fav-btn after click', async function(assert) {
  
    akira.set('isFavorite', true);
    this.set('model', akira);
  
    await render(hbs`{{fav-btn selected=model.isFavorite}}`);
  
    assert.notEqual(this.element.querySelector('.btn-fav.selected'), null);
  
    await click('.btn-fav');
  
    assert.equal(this.element.querySelector('.btn-fav.selected'), null);
  });
});
