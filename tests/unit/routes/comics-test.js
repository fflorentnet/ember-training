import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | comics', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:comics');
    assert.ok(route);
  });
});
