import Ember from "ember";
import { module, skip } from 'qunit';
import startApp from '../helpers/start-app';
import appRoute from 'ember-training/routes/application';

let application;

const NO_COMICS = [];
const MULTIPLE_NO_SCRIPTWRITERS = [{title: "Blacksad"}, {title: "Calvin and Hobbes"}];
const MIXED_SCRIPTWRITERS = [{title: "Blacksad"}, {title: "Calvin and Hobbes", scriptwriter: "Bill Watterson"}];

let setupApp = function (contentType) {
  appRoute.reopen({
    model: function () {
      switch (contentType) {
        case 'EMPTY':
          return NO_COMICS;
        case 'MIXED':
          return MIXED_SCRIPTWRITERS;
        default:
          return MULTIPLE_NO_SCRIPTWRITERS;
      }
    }
  });
  application = startApp();
};

module('01 - Templates Acceptance Tests', {
  afterEach() {
    Ember.run(application, 'destroy');
  }
});

skip("01 - Templates - 01 - Should display comics", function (assert) {
  assert.expect(4);

  setupApp();

  visit('/');
  andThen(() => {
    let $comics = find('.comics ');
    assert.equal($comics.length, 1, "Page contains the comics collection");

    let $comicItems = $comics.find('.comics-list > .comics-list-item');
    assert.equal($comicItems.length, 2, "Two items found");

    assert.ok($comicItems.eq(0).text().indexOf(MULTIPLE_NO_SCRIPTWRITERS[0].title) >= 0, "First comic title is correct");
    assert.ok($comicItems.eq(1).text().indexOf(MULTIPLE_NO_SCRIPTWRITERS[1].title) >= 0, "Second comic title is correct");
  });
});

skip("01 - Templates - 02 - Should display scriptwriter if exists", function (assert) {
  assert.expect(4);

  setupApp('MIXED');

  visit('/');
  andThen(() => {
    let $comics = find('.comics ');
    assert.equal($comics.length, 1, "Page contains the comics collection");

    let $comicItems = $comics.find('.comics-list > .comics-list-item');
    assert.equal($comicItems.length, 2, "Two items found");

    assert.ok($comicItems.eq(0).text().indexOf(MIXED_SCRIPTWRITERS[0].title) >= 0, "First comic title is correct");
    assert.ok($comicItems.eq(1).text().indexOf(MIXED_SCRIPTWRITERS[1].title + " by " + MIXED_SCRIPTWRITERS[1].scriptwriter) >= 0, "Second comic title is correct");
  });
});

skip("01 - Templates - 03 - Should change class if no scriptwriter", function (assert) {
  assert.expect(4);

  setupApp('MIXED');

  visit('/');
  andThen(() => {
    let $comics = find('.comics ');
    assert.equal($comics.length, 1, "Page contains the comics collection");

    let $comicItems = $comics.find('.comics-list > .comics-list-item');
    assert.equal($comicItems.length, 2, "Two items found");

    assert.ok($comicItems.eq(0).hasClass("comic-without-scriptwriter"), "First comic class is correct");
    assert.ok($comicItems.eq(1).hasClass("comic-with-scriptwriter"), "Second comic class is correct");
  });
});

skip("01 - Templates - 04 - Should display message if empty", function (assert) {
  assert.expect(3);

  setupApp('EMPTY');

  visit('/');
  andThen(() => {
    let $comics = find('.comics ');
    assert.equal($comics.length, 1, "Page contains the comics collection");

    assert.equal($comics.find('.comics-list > .comics-list-item').length, 0, "No item found");

    assert.ok($comics.find('.comics-list').text().indexOf("Sorry, no comic found") >= 0, "Empty message displayed");
  });
});
