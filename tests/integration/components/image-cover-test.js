import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | image cover', function(hooks) {
  setupRenderingTest(hooks);

  test('renders image-cover', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
  
    await render(hbs`{{image-cover name='akira'}}`);
  
    assert.notEqual(find('img'), null);
    assert.ok(find('img').classList.contains('cover'));
    assert.ok(find('img').src.indexOf("/assets/images/comics/covers/akira.jpg") >= 0);
  });
  
  test('renders image-cover - root is image', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
  
    await render(hbs`{{image-cover name='akira'}}`);
  
    assert.ok(this.element.firstElementChild.tagName === 'IMG');
    assert.ok(this.element.firstElementChild.classList.contains('cover'));
    assert.ok(this.element.firstElementChild.src.indexOf("/assets/images/comics/covers/akira.jpg") >= 0);
  });
});