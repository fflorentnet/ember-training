import { run } from '@ember/runloop';
import { visit, find, findAll } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import appRoute from 'ember-training/routes/application';

let application;

const NO_COMICS = [];
const MULTIPLE_NO_SCRIPTWRITERS = [{title: "Blacksad"}, {title: "Calvin and Hobbes"}];
const MIXED_SCRIPTWRITERS = [{title: "Blacksad"}, {title: "Calvin and Hobbes", scriptwriter: "Bill Watterson"}];

module('01 - Templates Acceptance Tests when no scriptwriters', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    appRoute.reopen({
      model: function () {
        return MULTIPLE_NO_SCRIPTWRITERS;
      }
    });
  });

  test("01 - Templates - 01 - Should display comics", async function (assert) {
    assert.expect(5);

    await visit('/');

    let $comics = find('.comics ');
    assert.notEqual($comics, null, "Page contains the comics collection");

    let $comicItems = findAll('.comics-list > .comics-list-item', $comics);
    assert.notEqual($comicItems, null, "Comics list exists");
    assert.equal($comicItems.length, 2, "Two items found");

    assert.ok($comicItems[0].textContent.indexOf(MULTIPLE_NO_SCRIPTWRITERS[0].title) >= 0, "First comic title is correct");
    assert.ok($comicItems[1].textContent.indexOf(MULTIPLE_NO_SCRIPTWRITERS[1].title) >= 0, "Second comic title is correct");
  });
});

module('01 - Templates Acceptance Tests when mixed scriptwriters', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    appRoute.reopen({
      model: function () {
        return MIXED_SCRIPTWRITERS;
      }
    });
  });

  test("01 - Templates - 02 - Should display scriptwriter if exists", async function (assert) {
    assert.expect(5);

    await visit('/');

    let $comics = find('.comics ');
    assert.notEqual($comics, null, "Page contains the comics collection");

    let $comicItems = findAll('.comics-list > .comics-list-item', $comics);
    assert.notEqual($comicItems, null, "Comics list exists");
    assert.equal($comicItems.length, 2, "Two items found");

    assert.ok($comicItems[0].textContent.indexOf(MIXED_SCRIPTWRITERS[0].title) >= 0, "First comic title is correct");
    assert.ok($comicItems[1].textContent.indexOf(MIXED_SCRIPTWRITERS[1].title + " by " + MIXED_SCRIPTWRITERS[1].scriptwriter) >= 0, "Second comic title is correct");
  });

  test("01 - Templates - 03 - Should change class if no scriptwriter", async function (assert) {
    assert.expect(5);

    await visit('/');

    let $comics = find('.comics ');
    assert.notEqual($comics, null, "Page contains the comics collection");

    let $comicItems = findAll('.comics-list > .comics-list-item', $comics);
    assert.notEqual($comicItems, null, "Comics list exists");
    assert.equal($comicItems.length, 2, "Two items found");

    assert.ok($comicItems[0].classList.contains("comic-without-scriptwriter"), "First comic class is correct");
    assert.ok($comicItems[1].classList.contains("comic-with-scriptwriter"), "Second comic class is correct");
  });
});

module('01 - Templates Acceptance Tests when empty', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    appRoute.reopen({
      model: function () {
        return NO_COMICS;
      }
    });
  });

  test("01 - Templates - 04 - Should display message if empty", async function (assert) {
    assert.expect(3);

    await visit('/');

    let $comics = find('.comics ');
    assert.notEqual($comics, null, "Page contains the comics collection");

    assert.equal(findAll('.comics-list > .comics-list-item', $comics).length, 0, "No item found");

    assert.ok(find('.comics-list', $comics).textContent.indexOf("Sorry, no comic found") >= 0, "Empty message displayed");
  });
});
