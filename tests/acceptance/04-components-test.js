import { visit, find, findAll, click, fillIn, currentRouteName } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { run } from '@ember/runloop';
import comicsRoute from 'ember-training/routes/comics';
import createRoute from 'ember-training/routes/comics/create';
import Comic from 'ember-training/models/comic';

const blackSad = Comic.create({
  slug: 'blacksad',
  title: 'Blacksad',
  scriptwriter: 'Juan Diaz Canales',
  illustrator: 'Juanjo Guarnido',
  publisher: 'Dargaud'
});

const calvinAndHobbes = Comic.create({
  slug: 'calvin-and-hobbes',
  title: 'Calvin and Hobbes',
  scriptwriter: 'Bill Watterson',
  illustrator: 'Bill Watterson',
  publisher: 'Andrews McMeel Publishing'
});

const akira = Comic.create({
  slug: 'akira',
  title: 'Akira',
  scriptwriter: 'Katsuhiro Otomo',
  illustrator: 'Katsuhiro Otomo',
  publisher: 'Epic Comics'
});

let originalDebug = console.debug;
let newComic;
let COMICS;

module('04 - Components Acceptance Tests', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    COMICS = [akira, blackSad, calvinAndHobbes];
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
  });

  test("04 - Components - 01 - Should log on index", async function (assert) {
    assert.expect(5);
  
    console.debug = function(){
      let args = Array.prototype.slice.call(arguments);
      assert.equal(args.join(' '), "akira - favorite: true");
      originalDebug(...arguments);
    };
  
    COMICS[0].set('isFavorite', false);
  
    await visit('/comics/akira');
 
    let $favComic = find(".btn-fav");
    assert.notEqual($favComic, null, "Fav btn exists");
    assert.equal(find(".btn-fav.selected"), null, "Fav btn unselected");
  
    await click(".btn-fav");
    assert.equal(currentRouteName(), 'comic.index', "Route name is correct");
    assert.notEqual(find(".btn-fav.selected"), null, "Fav btn selected");
    console.debug = originalDebug;
  });
  
  test("04 - Components - 02 - Should log on edit", async function (assert) {
    assert.expect(5);
  
    console.debug = function(){
      let args = Array.prototype.slice.call(arguments);
      assert.equal(args.join(' '), "akira - favorite: false");
      originalDebug(...arguments);
    };
  
    COMICS[0].set('isFavorite', true);
  
    await visit('/comics/akira/edit');
    
    let $favComic = find(".btn-fav");
    assert.notEqual($favComic, null, "Fav btn exists");
    assert.notEqual(find(".btn-fav.selected"), null, "Fav btn selected");
  
    await click(".btn-fav");
    
    assert.equal(currentRouteName(), 'comic.edit', "Route name is correct");
    assert.equal(find(".btn-fav.selected"), null, "Fav btn unselected");
    
    console.debug = originalDebug;
  });
  
  test("04 - Components - 03 - Image cover should fallback", async function (assert) {
    await visit('/comics/create');
    assert.ok(find(".cover").src.indexOf("/assets/images/comics/covers/default.jpg") >= 0, "Fallback loaded");
  });
  
  test("04 - Components - 04 - Image cover should change if model changes", async function (assert) {
    await visit('/comics/create');
    assert.ok(find(".cover").src.indexOf("/assets/images/comics/covers/default.jpg") >= 0, "Fallback loaded");
  
    run(() => {
      newComic.set('title', 'newComic');
    });
  
    assert.ok(find(".cover").src.indexOf("/assets/images/comics/covers/new-comic.jpg") >= 0, "Cover updated");
  });
});