import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Comic from 'ember-training/models/comic';

let akira = Comic.create({
  slug: 'akira',
  title: 'Akira',
  scriptwriter: 'Katsuhiro Otomo',
  illustrator: 'Katsuhiro Otomo',
  publisher: 'Epic Comics',
  isFavorite: false
});

moduleForComponent('fav-btn', 'Integration | Component | fav btn', {
  integration: true
});

test('renders fav-btn', function(assert) {

  akira.set('isFavorite', false);
  this.set('model', akira);

  this.render(hbs`{{fav-btn selected=model.isFavorite}}`);

  assert.equal(this.$().find('.btn-fav').length, 1);
  assert.notOk(this.$().find('.btn-fav').hasClass('selected'));
});

test('update fav-btn after external change', function(assert) {

  akira.set('isFavorite', false);
  this.set('model', akira);

  this.render(hbs`{{fav-btn selected=model.isFavorite}}`);

  assert.equal(this.$().find('.btn-fav.selected').length, 0);

  Ember.run(() => {
    akira.set('isFavorite', true);
  });

  assert.equal(this.$().find('.btn-fav.selected').length, 1);
});

test('update fav-btn after click', function(assert) {

  akira.set('isFavorite', true);
  this.set('model', akira);

  this.render(hbs`{{fav-btn selected=model.isFavorite}}`);

  assert.equal(this.$().find('.btn-fav.selected').length, 1);

  this.$().find('.btn-fav').click();

  assert.equal(this.$().find('.btn-fav.selected').length, 0);
});
