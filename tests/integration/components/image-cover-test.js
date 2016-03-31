import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('image-cover', 'Integration | Component | image cover', {
  integration: true
});

test('renders image-cover', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{image-cover name='akira'}}`);

  assert.equal(this.$().find('img').length, 1);
  assert.ok(this.$().find('img').hasClass('cover'));
  assert.equal(this.$().find('img').attr('src'), "/assets/images/comics/covers/akira.jpg");
});

test('renders image-cover - root is image', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{image-cover name='akira'}}`);

  assert.ok(this.$().children().first().is('img'));
  assert.ok(this.$().children().first().hasClass('cover'));
  assert.equal(this.$().children().first().attr('src'), "/assets/images/comics/covers/akira.jpg");
});
