import { test } from 'qunit';
import moduleForAcceptance from '../helpers/module-for-acceptance';

moduleForAcceptance('03 - Controller Acceptance Tests', {
  beforeEach() {
    window.confirm = function() {
      return true;
    };
  }
});

test("03 - Controller - 01 - Should save on edit submit", function (assert) {
  assert.expect(4);

  visit('/comics/akira/edit');
  andThen(() => {
    let $selectedComic = find(".comic");
    assert.equal($selectedComic.length, 1, "Current selected comics zone is displayed");

    let $form = $selectedComic.find("form");
    assert.equal($form.length, 1, "Comic form exists");

    let newTitle = "new value";
    fillIn(".comic form #title", newTitle);
    click(".comic form .btn-submit");
    andThen(() => {
      assert.equal(currentRouteName(), 'comic.index', "Route name is correct");
      assert.ok(find(".comic .comic-title").text().indexOf(newTitle) >= 0, "Title modified");
    });
  });
});

test("03 - Controller - 02 - Should cancel on edit reset", function (assert) {
  assert.expect(5);

  visit('/comics/akira/edit');
  andThen(() => {
    let $selectedComic = find(".comic");
    assert.equal($selectedComic.length, 1, "Current selected comics zone is displayed");

    let $form = $selectedComic.find("form");
    assert.equal($form.length, 1, "Comic form exists");

    let newTitle = "new value";
    fillIn(".comic form #title", newTitle);
    click(".comic form .btn-cancel");
    andThen(() => {
      assert.equal(currentRouteName(), 'comic.index', "Route name is correct");
      assert.ok(find(".comic .comic-title").text().indexOf("Akira") >= 0, "Title not modified");
      assert.ok($(find(".comics .comics-list .comics-list-item a").get(0)).text().indexOf("Akira") >= 0, "List not modified");
    });
  });
});

test("03 - Controller - 03 - Should save on create submit", function (assert) {
  assert.expect(4);

  visit('/comics/create');
  andThen(() => {
    let $selectedComic = find(".comic");
    assert.equal($selectedComic.length, 1, "Current selected comics zone is displayed");

    let $form = $selectedComic.find("form");
    assert.equal($form.length, 1, "Comic form exists");

    let newTitle = "new value";
    fillIn(".comic form #title", newTitle);
    click(".comic form .btn-submit");
    andThen(() => {
      assert.equal(currentRouteName(), 'comic.index', "Route name is correct");
      assert.ok(find(".comic .comic-title").text().indexOf(newTitle) >= 0, "Title modified");
    });
  });
});

test("03 - Controller - 04 - Should reinit list on create reset", function (assert) {
  assert.expect(4);

  visit('/comics/create');
  andThen(() => {
    let $selectedComic = find(".comic");
    assert.equal($selectedComic.length, 1, "Current selected comics zone is displayed");

    let $form = $selectedComic.find("form");
    assert.equal($form.length, 1, "Comic form exists");

    let newTitle = "new value";
    fillIn(".comic form #title", newTitle);
    click(".comic form .btn-cancel");
    andThen(() => {
      assert.equal(currentRouteName(), 'comics.index', "Route name is correct");
      assert.equal(find(".comics .comics-list .comics-list-item a").length, 3, "Creation cancelled");
    });
  });
});

test("03 - Controller - 05 - Should cancel edit on transition", function (assert) {
  assert.expect(5);

  visit('/comics/akira/edit');
  andThen(() => {
    let $selectedComic = find(".comic");
    assert.equal($selectedComic.length, 1, "Current selected comics zone is displayed");

    let $form = $selectedComic.find("form");
    assert.equal($form.length, 1, "Comic form exists");

    let newTitle = "new value";
    fillIn(".comic form #title", newTitle);
    visit('/comics/akira');
    andThen(() => {
      assert.equal(currentRouteName(), 'comic.index', "Route name is correct");
      assert.ok(find(".comic .comic-title").text().indexOf("Akira") >= 0, "Title not modified");
      assert.ok($(find(".comics .comics-list .comics-list-item a").get(0)).text().indexOf("Akira") >= 0, "List not modified");
    });
  });
});

test("03 - Controller - 06 - Should call willTransition on edit despite an old save", function (assert) {
  assert.expect(5);

  visit('/comics/akira/edit');
  andThen(() => {
    let $selectedComic = find(".comic");
    assert.equal($selectedComic.length, 1, "Current selected comics zone is displayed");

    let $form = $selectedComic.find("form");
    assert.equal($form.length, 1, "Comic form exists");

    // edit the comic and discard clicking on another comic
    fillIn(".comic form #title", "new value");
    click(".comics .comics-list > .comics-list-item:last-child > a");

    // edit a comic and save it
    click(".comic .btn-edit");
    fillIn(".comic form #title", "Akira");
    click(".comic form .btn-submit");

    // edit a comic and discard clicking on another comic
    click(".comic .btn-edit");
    fillIn(".comic form #title", "new value");
    click(".comics .comics-list > .comics-list-item:last-child > a");

    andThen(() => {
      assert.equal(currentRouteName(), 'comic.index', "Route name is correct");
      assert.ok(find(".comic h3").text().indexOf("Akira") >= 0, "Title not modified");
      assert.ok($(find(".comics .comics-list .comics-list-item a").get(0)).text().indexOf("Akira") >= 0, "List not modified");
    });
  });
});

test("03 - Controller - 07 - Should cancel edit after confirm true", function (assert) {
  assert.expect(6);

  window.confirm = function() {
    assert.ok(true, "confirm called");
    return true;
  };

  visit('/comics/akira/edit');
  andThen(() => {
    let $selectedComic = find(".comic");
    assert.equal($selectedComic.length, 1, "Current selected comics zone is displayed");

    let $form = $selectedComic.find("form");
    assert.equal($form.length, 1, "Comic form exists");

    let newTitle = "new value";
    fillIn(".comic form #title", newTitle);
    click(".comics .comics-list > .comics-list-item:last-child > a");
    andThen(() => {
      assert.equal(currentRouteName(), 'comic.index', "Route name is correct");
      assert.ok(find(".comic .comic-title").text().indexOf("Akira") >= 0, "Title not modified");
      assert.ok($(find(".comics .comics-list .comics-list-item a").get(0)).text().indexOf("Akira") >= 0, "List not modified");
    });
  });
});

test("03 - Controller - 08 - Should abort edit after confirm false", function (assert) {
  assert.expect(6);

  window.confirm = function() {
    assert.ok(true, "confirm called");
    return false;
  };

  visit('/comics/akira/edit');
  andThen(() => {
    let $selectedComic = find(".comic");
    assert.equal($selectedComic.length, 1, "Current selected comics zone is displayed");

    let $form = $selectedComic.find("form");
    assert.equal($form.length, 1, "Comic form exists");

    let newTitle = "a new value";
    fillIn(".comic form #title", newTitle);
    visit('/comics/akira');
    andThen(() => {
      assert.equal(currentRouteName(), 'comic.edit', "Route name is correct");
      assert.ok(find(".comic .comic-title input").val().indexOf(newTitle) >= 0, "Title still modified");
      assert.ok($(find(".comics .comics-list .comics-list-item a").get(0)).text().indexOf(newTitle) >= 0, "List still modified");
    });
  });
});

test("03 - Controller - 09 - Should cancel create on transition", function (assert) {
  assert.expect(4);

  visit('/comics/create');
  andThen(() => {
    let $selectedComic = find(".comic");
    assert.equal($selectedComic.length, 1, "Current selected comics zone is displayed");

    let $form = $selectedComic.find("form");
    assert.equal($form.length, 1, "Comic form exists");

    let newTitle = "new value";
    fillIn(".comic form #title", newTitle);
    click(".comics .comics-list > .comics-list-item:first-child > a");
    andThen(() => {
      assert.equal(currentRouteName(), 'comic.index', "Route name is correct");
      assert.equal(find(".comics .comics-list .comics-list-item a").length, 3, "Creation cancelled");
    });
  });
});

test("03 - Controller - 10 - Should call willTransition on create despite an old save", function (assert) {
  assert.expect(4);

  visit('/comics/create');
  andThen(() => {
    let $selectedComic = find(".comic");
    assert.equal($selectedComic.length, 1, "Current selected comics zone is displayed");

    let $form = $selectedComic.find("form");
    assert.equal($form.length, 1, "Comic form exists");

    // edit the comic and discard clicking on another comic
    fillIn(".comic form #title", "new value");
    click(".comics .comics-list > .comics-list-item:first-child > a");

    // create a comic and save it
    click(".comics > a");
    fillIn(".comic form #title", "new value");
    click(".comic form .btn-submit");

    // create a comic and discard clicking on another comic
    click(".comics > a");
    fillIn(".comic form #title", "new value 2");
    click(".comics .comics-list > .comics-list-item:first-child > a");

    andThen(() => {
      assert.equal(currentRouteName(), 'comic.index', "Route name is correct");
      assert.equal(find(".comics .comics-list .comics-list-item a").length, 4, "Creation cancelled");
    });
  });
});

test("03 - Controller - 11 - Should cancel create after confirm true", function (assert) {
  assert.expect(5);

  window.confirm = function() {
    assert.ok(true, "confirm called");
    return true;
  };

  visit('/comics/create');
  andThen(() => {
    let $selectedComic = find(".comic");
    assert.equal($selectedComic.length, 1, "Current selected comics zone is displayed");

    let $form = $selectedComic.find("form");
    assert.equal($form.length, 1, "Comic form exists");

    let newTitle = "new value";
    fillIn(".comic form #title", newTitle);
    click(".comics .comics-list > .comics-list-item:first-child > a");
    andThen(() => {
      assert.equal(currentRouteName(), 'comic.index', "Route name is correct");
      assert.equal(find(".comics .comics-list .comics-list-item a").length, 3, "Creation cancelled");
    });
  });
});

test("03 - Controller - 12 - Should abort create after confirm false", function (assert) {
  assert.expect(6);

  window.confirm = function() {
    assert.ok(true, "confirm called");
    return false;
  };

  visit('/comics/create');
  andThen(() => {
    let $selectedComic = find(".comic");
    assert.equal($selectedComic.length, 1, "Current selected comics zone is displayed");

    let $form = $selectedComic.find("form");
    assert.equal($form.length, 1, "Comic form exists");

    let newTitle = "new value";
    fillIn(".comic form #title", newTitle);
    click(".comics .comics-list > .comics-list-item:first-child > a");
    andThen(() => {
      assert.equal(currentRouteName(), 'comics.create', "Route name is correct");
      assert.ok(find(".comic .comic-title input").val().indexOf(newTitle) >= 0, "Title still modified");
      assert.equal(find(".comics .comics-list .comics-list-item a").length, 4, "Creation not cancelled");
    });
  });
});

test("03 - Controller - 13 - Should filter", function (assert) {
  assert.expect(5);

  visit('/comics');
  andThen(() => {
    let $comics = find(".comics .comics-list > .comics-list-item");
    let comicsLength = $comics.length;
    assert.equal(comicsLength, 3, "Comics list displayed with 3 items");

    assert.equal(find("input").length, 1, "filter input exists");

    fillIn("input", "bla");
    andThen(() => {
      $comics = find(".comics .comics-list .comics-list-item a");
      assert.equal($comics.length, 1, "List filtered");
      assert.ok($comics.get(0).innerText.indexOf("Blacksad") >= 0, "List filtered correctly");
    });

    fillIn("input", "");
    andThen(() => {
      $comics = find(".comics .comics-list .comics-list-item a");
      assert.equal($comics.length, 3, "List not filtered");
    });
  });
});

test("03 - Controller - 14 - Should sort", function (assert) {
  assert.expect(5);

  visit('/comics');
  andThen(() => {
    let $comics = find(".comics .comics-list > .comics-list-item");
    let comicsLength = $comics.length;
    assert.equal(comicsLength, 3, "Comics list displayed with 3 items");

    assert.equal(find(".btn-sort").length, 1, "sort button exists");

    $comics = find(".comics .comics-list .comics-list-item a");
    assert.ok($comics.get(0).innerText.indexOf("Akira") >= 0, "List sorted asc by default");

    click(".btn-sort");
    andThen(() => {
      $comics = find(".comics .comics-list .comics-list-item a");
      assert.ok($comics.get(0).innerText.indexOf("Calvin and Hobbes") >= 0, "List sorted desc correctly");
    });

    click(".btn-sort");
    andThen(() => {
      $comics = find(".comics .comics-list .comics-list-item a");
      assert.ok($comics.get(0).innerText.indexOf("Akira") >= 0, "List sorted asc correctly");
    });
  });
});
