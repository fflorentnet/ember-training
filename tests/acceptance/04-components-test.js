import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import comicsRoute from 'ember-training/routes/comics';
import createRoute from 'ember-training/routes/comics/create';
import Comic from 'ember-training/models/comic';

let application;

let blackSad = Comic.create({
  slug: 'blacksad',
  title: 'Blacksad',
  scriptwriter: 'Juan Diaz Canales',
  illustrator: 'Juanjo Guarnido',
  publisher: 'Dargaud'
});

let calvinAndHobbes = Comic.create({
  slug: 'calvin-and-hobbes',
  title: 'Calvin and Hobbes',
  scriptwriter: 'Bill Watterson',
  illustrator: 'Bill Watterson',
  publisher: 'Andrews McMeel Publishing'
});

let akira = Comic.create({
  slug: 'akira',
  title: 'Akira',
  scriptwriter: 'Katsuhiro Otomo',
  illustrator: 'Katsuhiro Otomo',
  publisher: 'Epic Comics'
});

let originalDebug = Ember.Logger.debug;

let newComic;

const COMICS = [akira, blackSad, calvinAndHobbes];

let setupApp = function () {
  comicsRoute.reopen({
    model: function () {
      return COMICS;
    },
    modelFor() {
      return COMICS ;
    }
  });

  createRoute.reopen({
    model: function (params, transition) {
      newComic = this._super(params, transition);
      return newComic;
    }
  });

  window.confirm = function() {
    return true;
  };

  application = startApp();
};

module('04 - Components Acceptance Tests', {
  beforeEach() {
    setupApp();
  },
  afterEach() {
    Ember.run(application, 'destroy');
  }
});

test("04 - Components - 01 - Should log on index", function (assert) {
  assert.expect(5);

  Ember.Logger.debug = function(){
    let args = Array.prototype.slice.call(arguments);
    assert.equal(args.join(' '), "akira - favorite: true");
    originalDebug(...arguments);
  };

  COMICS[0].set('isFavorite', false);

  visit('/comics/akira');
  andThen(() => {
    let $favComic = find(".btn-fav");
    assert.equal($favComic.length, 1, "Fav btn exists");
    assert.equal(find(".btn-fav.selected").length, 0, "Fav btn unselected");

    click(".btn-fav");
    andThen(() => {
      assert.equal(currentRouteName(), 'comic.index', "Route name is correct");
      assert.equal(find(".btn-fav.selected").length, 1, "Fav btn selected");
      Ember.Logger.debug = originalDebug;
    });
  });
});

test("04 - Components - 02 - Should log on edit", function (assert) {
  assert.expect(5);

  Ember.Logger.debug = function(){
    let args = Array.prototype.slice.call(arguments);
    assert.equal(args.join(' '), "akira - favorite: false");
    originalDebug(...arguments);
  };

  COMICS[0].set('isFavorite', true);

  visit('/comics/akira/edit');
  andThen(() => {
    let $favComic = find(".btn-fav");
    assert.equal($favComic.length, 1, "Fav btn exists");
    assert.equal(find(".btn-fav.selected").length, 1, "Fav btn selected");

    click(".btn-fav");
    andThen(() => {
      assert.equal(currentRouteName(), 'comic.edit', "Route name is correct");
      assert.equal(find(".btn-fav.selected").length, 0, "Fav btn unselected");
      Ember.Logger.debug = originalDebug;
    });
  });
});

test("04 - Components - 03 - Image cover should fallback", function (assert) {
  visit('/comics/create');
  andThen(() => {
    assert.equal(find(".cover").attr("src"), "/assets/images/comics/covers/default.jpg", "Fallback loaded");
  });
});

test("04 - Components - 04 - Image cover should change if model changes", function (assert) {
  visit('/comics/create');
  andThen(() => {
    assert.equal(find(".cover").attr("src"), "/assets/images/comics/covers/default.jpg", "Fallback loaded");

    Ember.run(() => {
      newComic.set('title', 'newComic');
    });

    assert.equal(find(".cover").attr("src"), "/assets/images/comics/covers/new-comic.jpg", "Cover updated");
  });
});
