import Ember from "ember";
import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:comics', 'Unit | Controller | comics', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  const controller = this.subject();
  assert.ok(controller);
});

test('should correctly compute sortDefinition on sortAsc udate', function(assert) {
  const controller = this.subject();

  assert.equal(controller.get('sortDefinition').length, 1);
  assert.equal(controller.get('sortDefinition').get(0), "title:asc");

  controller.set('sortAsc', false);
  assert.equal(controller.get('sortDefinition').length, 1);
  assert.equal(controller.get('sortDefinition').get(0), "title:desc");

  controller.set('sortAsc', true);
  assert.equal(controller.get('sortDefinition').length, 1);
  assert.equal(controller.get('sortDefinition').get(0), "title:asc");
});

test('should correctly compute filteredComics on filter update', function(assert) {
  const controller = this.subject();
  const model = [Ember.Object.create({title: "Akira"}), Ember.Object.create({title: "Blacksad"})];
  controller.set('model', model);
  controller.set('filter', "");

  assert.equal(controller.get('filteredComics').length, 2);

  controller.set('filter', "kira");
  assert.equal(controller.get('filteredComics').length, 1);
  assert.equal(controller.get('filteredComics').get(0).get('title'), "Akira");

  controller.set('filter', "bla");
  assert.equal(controller.get('filteredComics').length, 1);
  assert.equal(controller.get('filteredComics').get(0).get('title'), "Blacksad");
});

test('should correctly compute filteredComics on model update', function(assert) {
  const controller = this.subject();
  const model = [Ember.Object.create({title: "Akira"}), Ember.Object.create({title: "Blacksad"})];
  controller.set('model', model);
  controller.set('filter', "Aki");

  assert.equal(controller.get('filteredComics').length, 1);

  controller.get('model').pushObject(Ember.Object.create({title: "Akira2"}));
  assert.equal(controller.get('filteredComics').length, 2);

  controller.get('model').popObject();
  assert.equal(controller.get('filteredComics').length, 1);
});

test('should correctly compute filteredComics on model.title update', function(assert) {
  const controller = this.subject();
  const model = [Ember.Object.create({title: "Akira"}), Ember.Object.create({title: "Blacksad"})];
  controller.set('model', model);
  controller.set('filter', "Aki");

  assert.equal(controller.get('filteredComics').length, 1);

  controller.get('model').get(0).set('title', "new value");
  assert.equal(controller.get('filteredComics').length, 0);

  controller.get('model').get(0).set('title', "Akira");
  assert.equal(controller.get('filteredComics').length, 1);
});

test('should correctly compute sortedComics on model update', function(assert) {
  const controller = this.subject();
  const model = [Ember.Object.create({title: "Akira"}), Ember.Object.create({title: "Blacksad"})];
  controller.set('model', model);
  controller.set('sortAsc', false);

  assert.equal(controller.get('sortedComics').length, 2);
  assert.equal(controller.get('sortedComics').get(0).get('title'), "Blacksad");

  controller.get('model').pushObject(Ember.Object.create({title: "Calvin and Hobbes"}));
  assert.equal(controller.get('sortedComics').get(0).get('title'), "Calvin and Hobbes");

  controller.get('model').get(2).set('title', "ab");
  assert.equal(controller.get('sortedComics').get(0).get('title'), "Blacksad");
});

test('should correctly compute sortedComics on sortAsc update', function(assert) {
  const controller = this.subject();
  const model = [Ember.Object.create({title: "Akira"}), Ember.Object.create({title: "Blacksad"})];
  controller.set('model', model);
  controller.set('sortAsc', false);

  assert.equal(controller.get('sortedComics').length, 2);
  assert.equal(controller.get('sortedComics').get(0).get('title'), "Blacksad");

  controller.set('sortAsc', true);
  assert.equal(controller.get('sortedComics').get(0).get('title'), "Akira");
});
