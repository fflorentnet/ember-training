import { visit, find, findAll, click, fillIn, currentRouteName } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { startMirage } from '../../initializers/ember-cli-mirage';

const setup = function(hooks) {
  hooks.beforeEach(function() {
    this.server = startMirage();

    window.confirm = function() {
      return true;
    };
  });

  hooks.afterEach(function() {
    this.server.shutdown();
  });
}

module('03 - Controller Acceptance Tests', function(hooks) {
  setupApplicationTest(hooks);
  setup(hooks);

  test("03 - Controller - 01 - Should save on edit submit", async function (assert) {
    assert.expect(4);

    await visit('/comics/akira/edit');

    let $selectedComic = find(".comic");
    assert.notEqual($selectedComic, null, "Current selected comics zone is displayed");

    let $form = $selectedComic.querySelector("form");
    assert.notEqual($form, null, "Comic form exists");

    let newTitle = "new value";
    await fillIn(".comic form #title", newTitle);
    await click(".comic form .btn-submit");

    assert.equal(currentRouteName(), 'comic.index', "Route name is correct");
    assert.ok(find(".comic .comic-title").textContent.indexOf(newTitle) >= 0, "Title modified");
  });

  test("03 - Controller - 02 - Should cancel on edit reset", async function (assert) {
    assert.expect(5);

    await visit('/comics/akira/edit');

    let $selectedComic = find(".comic");
    assert.notEqual($selectedComic, null, "Current selected comics zone is displayed");

    let $form = $selectedComic.querySelector("form");
    assert.notEqual($form, null, "Comic form exists");

    let newTitle = "new value";
    await fillIn(".comic form #title", newTitle);
    await click(".comic form .btn-cancel");

    assert.equal(currentRouteName(), 'comic.index', "Route name is correct");
    assert.ok(find(".comic .comic-title").textContent.indexOf("Akira") >= 0, "Title not modified");
    assert.ok(findAll(".comics .comics-list .comics-list-item a")[0].textContent.indexOf("Akira") >= 0, "List not modified");
  });

  test("03 - Controller - 03 - Should save on create submit", async function (assert) {
    assert.expect(4);

    await visit('/comics/create');

    let $selectedComic = find(".comic");
    assert.notEqual($selectedComic, null, "Current selected comics zone is displayed");

    let $form = $selectedComic.querySelector("form");
    assert.notEqual($form, null, "Comic form exists");

    let newTitle = "new value";
    await fillIn(".comic form #title", newTitle);
    await click(".comic form .btn-submit");

    assert.equal(currentRouteName(), 'comic.index', "Route name is correct");
    assert.ok(find(".comic h3").textContent.indexOf(newTitle) >= 0, "Title modified");
  });

  test("03 - Controller - 04 - Should reinit list on create reset", async function (assert) {
    assert.expect(4);
    await visit('/comics/create');

    let $selectedComic = find(".comic");
    assert.notEqual($selectedComic, null, "Current selected comics zone is displayed");

    let $form = $selectedComic.querySelector("form");
    assert.notEqual($form, null, "Comic form exists");

    let newTitle = "new value";
    await fillIn(".comic form #title", newTitle);
    await click(".comic form .btn-cancel");

    assert.equal(currentRouteName(), 'comics.index', "Route name is correct");
    assert.equal(findAll(".comics .comics-list .comics-list-item a").length, 3, "Creation cancelled");
  });

  test("03 - Controller - 05 - Should cancel edit on transition", async function (assert) {
    assert.expect(5);
    await visit('/comics/akira/edit');

    let $selectedComic = find(".comic");
    assert.notEqual($selectedComic, null, "Current selected comics zone is displayed");

    let $form = $selectedComic.querySelector("form");
    assert.notEqual($form, null, "Comic form exists");
    let newTitle = "new value";

    await fillIn(".comic form #title", newTitle);
    await visit('/comics/akira');

    assert.equal(currentRouteName(), 'comic.index', "Route name is correct");
    assert.ok(find(".comic .comic-title").textContent.indexOf("Akira") >= 0, "Title not modified");
    assert.ok(findAll(".comics .comics-list .comics-list-item a")[0].textContent.indexOf("Akira") >= 0, "List not modified");
  });

  test("03 - Controller - 06 - Should call willTransition on edit despite an old save", async function (assert) {
    assert.expect(5);
    await visit('/comics/akira/edit');

    let $selectedComic = find(".comic");
    assert.notEqual($selectedComic, null, "Current selected comics zone is displayed");

    let $form = $selectedComic.querySelector("form");
    assert.notEqual($form, null, "Comic form exists");

    // edit the comic and discard clicking on another comic
    await fillIn(".comic form #title", "new value");
    await click(".comics .comics-list > .comics-list-item:last-child > a");

    // edit a comic and save it
    await click(".comic .btn-edit");
    await fillIn(".comic form #title", "Akira");
    await click(".comic form .btn-submit");

    // edit a comic and discard clicking on another comic
    await click(".comic .btn-edit");
    await fillIn(".comic form #title", "new value");
    await click(".comics .comics-list > .comics-list-item:last-child > a");

    assert.equal(currentRouteName(), 'comic.index', "Route name is correct");
    assert.ok(find(".comic h3").textContent.indexOf("Akira") >= 0, "Title not modified");
    assert.ok(findAll(".comics .comics-list .comics-list-item a")[0].textContent.indexOf("Akira") >= 0, "List not modified");
  });

  test("03 - Controller - 07 - Should cancel edit after confirm true", async function (assert) {
    assert.expect(6);

    window.confirm = function() {
      assert.ok(true, "confirm called");
      return true;
    };

    await visit('/comics/akira/edit');

    let $selectedComic = find(".comic");
    assert.notEqual($selectedComic, null, "Current selected comics zone is displayed");

    let $form = $selectedComic.querySelector("form");
    assert.notEqual($form, null, "Comic form exists");

    let newTitle = "new value";
    await fillIn(".comic form #title", newTitle);
    await click(".comics .comics-list > .comics-list-item:last-child > a");

    assert.equal(currentRouteName(), 'comic.index', "Route name is correct");
    assert.ok(find(".comic .comic-title").textContent.indexOf("Akira") >= 0, "Title not modified");
    assert.ok(findAll(".comics .comics-list .comics-list-item a")[0].textContent.indexOf("Akira") >= 0, "List not modified");
  });

  test("03 - Controller - 08 - Should abort edit after confirm false", async function (assert) {
    assert.expect(7);

    window.confirm = function() {
      assert.ok(true, "confirm called");
      return false;
    };

    await visit('/comics/akira/edit');

    let $selectedComic = find(".comic");
    assert.notEqual($selectedComic, null, "Current selected comics zone is displayed");

    let $form = $selectedComic.querySelector("form");
    assert.notEqual($form, null, "Comic form exists");

    let newTitle = "a new value";
    await fillIn(".comic form #title", newTitle);

    try {
      await visit('/comics/akira');
    } catch (err) {
      assert.equal(err.message, "TransitionAborted", "Transition aborted");
    }

    assert.equal(currentRouteName(), 'comic.edit', "Route name is correct");
    assert.ok(find(".comic .comic-title input").value.indexOf(newTitle) >= 0, "Title still modified");
    assert.ok(findAll(".comics .comics-list .comics-list-item a")[0].textContent.indexOf(newTitle) >= 0, "List still modified");
  });

  test("03 - Controller - 09 - Should cancel create on transition", async function (assert) {
    assert.expect(4);

    await visit('/comics/create');

    let $selectedComic = find(".comic");
    assert.notEqual($selectedComic, null, "Current selected comics zone is displayed");

    let $form = $selectedComic.querySelector("form");
    assert.notEqual($form, null, "Comic form exists");

    let newTitle = "new value";

    await fillIn(".comic form #title", newTitle);
    await click(".comics .comics-list > .comics-list-item:first-child > a");

    assert.equal(currentRouteName(), 'comic.index', "Route name is correct");
    assert.equal(findAll(".comics .comics-list .comics-list-item a").length, 3, "Creation cancelled");
  });

  test("03 - Controller - 10 - Should call willTransition on create despite an old save", async function (assert) {
    assert.expect(4);

    await visit('/comics/create');

    let $selectedComic = find(".comic");
    assert.notEqual($selectedComic, null, "Current selected comics zone is displayed");

    let $form = $selectedComic.querySelector("form");
    assert.notEqual($form, null, "Comic form exists");

    // edit the comic and discard clicking on another comic
    await fillIn(".comic form #title", "new value");
    await click(".comics .comics-list > .comics-list-item:first-child > a");

    // create a comic and save it
    await click(".comics > a");
    await fillIn(".comic form #title", "new value");
    await click(".comic form .btn-submit");

    // create a comic and discard clicking on another comic
    await click(".comics > a");
    await fillIn(".comic form #title", "new value 2");
    await click(".comics .comics-list > .comics-list-item:first-child > a");

    assert.equal(currentRouteName(), 'comic.index', "Route name is correct");
    assert.equal(findAll(".comics .comics-list .comics-list-item a").length, 4, "Creation cancelled");
  });

  test("03 - Controller - 11 - Should cancel create after confirm true", async function (assert) {
    assert.expect(5);

    window.confirm = function() {
      assert.ok(true, "confirm called");
      return true;
    };

    await visit('/comics/create');

    let $selectedComic = find(".comic");
    assert.notEqual($selectedComic, null, "Current selected comics zone is displayed");

    let $form = $selectedComic.querySelector("form");
    assert.notEqual($form, null, "Comic form exists");

    let newTitle = "new value";
    await fillIn(".comic form #title", newTitle);
    await click(".comics .comics-list > .comics-list-item:first-child > a");

    assert.equal(currentRouteName(), 'comic.index', "Route name is correct");
    assert.equal(findAll(".comics .comics-list .comics-list-item a").length, 3, "Creation cancelled");
  });

  test("03 - Controller - 12 - Should abort create after confirm false", async function (assert) {
    assert.expect(6);

    window.confirm = function() {
      assert.ok(true, "confirm called");
      return false;
    };

    await visit('/comics/create');

    let $selectedComic = find(".comic");
    assert.notEqual($selectedComic, null, "Current selected comics zone is displayed");

    let $form = $selectedComic.querySelector("form");
    assert.notEqual($form, null, "Comic form exists");

    let newTitle = "new value";
    await fillIn(".comic form #title", newTitle);
    await click(".comics .comics-list > .comics-list-item:first-child > a");

    assert.equal(currentRouteName(), 'comics.create', "Route name is correct");
    assert.ok(find(".comic .comic-title input").value.indexOf(newTitle) >= 0, "Title still modified");
    assert.equal(findAll(".comics .comics-list .comics-list-item a").length, 4, "Creation not cancelled");
  });

  test("03 - Controller - 13 - Should filter", async function (assert) {
    assert.expect(5);

    await visit('/comics');
    let $comics = findAll(".comics .comics-list > .comics-list-item");
    let comicsLength = $comics.length;
    assert.equal(comicsLength, 3, "Comics list displayed with 3 items");
    assert.notEqual(find("input"), null, "filter input exists");

    await fillIn("input", "bla");
    $comics = findAll(".comics .comics-list .comics-list-item a");
    assert.equal($comics.length, 1, "List filtered");
    assert.ok($comics[0].textContent.indexOf("Blacksad") >= 0, "List filtered correctly");

    await fillIn("input", "");
    $comics = findAll(".comics .comics-list .comics-list-item a");
    assert.equal($comics.length, 3, "List not filtered");
  });

  test("03 - Controller - 14 - Should sort", async function (assert) {
    assert.expect(5);

    await visit('/comics');
    let $comics = findAll(".comics .comics-list > .comics-list-item");
    let comicsLength = $comics.length;
    assert.equal(comicsLength, 3, "Comics list displayed with 3 items");
    assert.notEqual(find(".btn-sort"), null, "sort button exists");
    $comics = findAll(".comics .comics-list .comics-list-item a");
    assert.ok($comics[0].textContent.indexOf("Akira") >= 0, "List sorted asc by default");

    await click(".btn-sort");
    $comics = findAll(".comics .comics-list .comics-list-item a");
    assert.ok($comics[0].textContent.indexOf("Calvin and Hobbes") >= 0, "List sorted desc correctly");

    await click(".btn-sort");
    $comics = findAll(".comics .comics-list .comics-list-item a");
    assert.ok($comics[0].textContent.indexOf("Akira") >= 0, "List sorted asc correctly");
  });
});
