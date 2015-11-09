import Object from '@ember/object';

import { visit, find, findAll, click, currentRouteName } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import comicsRoute from 'ember-training/routes/comics';

const Comic = Object.extend({
  slug: '',
  title: '',
  scriptwriter: '',
  illustrator: '',
  publisher: ''
});

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

const COMICS = [akira, blackSad, calvinAndHobbes];

module('02 - Routing Acceptance Tests', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    comicsRoute.reopen({
      model: function () {
        return COMICS;
      }
    });
  });

  test("02 - Routing - 01 - Should display second level title", async function (assert) {
    assert.expect(4);
  
    await visit('/comics');

    assert.notEqual(find('.application'), null, "Page contains an application container");
  
    let $pageHeader = find('.application .header');
    assert.notEqual($pageHeader, null, "Page contains a page header");
  
    let $title = find(".application .comics .comics-title");
    assert.notEqual($title, null, "Page contains a .comics-title element");
    assert.equal($title.textContent, "Comics list", "Subtitle is correct");
  });
  
  test("02 - Routing - 02 - Should display text on comics/", async function (assert) {
    assert.expect(1);
  
    await visit('/comics');
    
    assert.ok(find("#no-selected-comic").textContent.indexOf("Please select on comic book for detailled information.") >= 0, "No selected comics text is displayed");
  });
  
  test("02 - Routing - 03 - Should display single comic zone", async function (assert) {
    assert.expect(1);
  
    await visit('/comics/akira');

    assert.notEqual(find(".comic"), null, "Current selected comics zone is displayed");
  });
  
  test("02 - Routing - 04 - Should display the comic detail", async function (assert) {
    assert.expect(7);
  
    await visit('/comics/akira');

    let $selectedComic = find(".comic");
    assert.notEqual($selectedComic, null, "Current selected comics zone is displayed");

    let $title = find(".comic-title", $selectedComic);
    assert.notEqual($title, null, "Comic title exists");
    assert.ok($title.textContent.indexOf(akira.title) >= 0, "Comic title is correct");

    let $props = findAll(".comic-description > .comic-value");
    assert.equal($props.length, 3, "Comic properties exist");
    assert.ok($props[0].textContent.indexOf(akira.scriptwriter) >= 0, "Comic scriptwriter is correct");
    assert.ok($props[1].textContent.indexOf(akira.illustrator) >= 0, "Comic illustrator is correct");
    assert.ok($props[2].textContent.indexOf(akira.publisher) >= 0, "Comic publisher is correct");
  });
  
  test("02 - Routing - 05 - Should display links", async function (assert) {
    assert.expect(8);
  
    await visit('/comics/akira');

    let $comics = findAll(".comics .comics-list > .comics-list-item > a");
    assert.notEqual($comics, null, "Comics list exists");
    assert.ok($comics.length >= 3, "Comics are displayed");

    assert.ok($comics[0].href.indexOf('/comics/' + akira.get('slug')) >= 0, "akira url is correct");
    assert.ok($comics[0].classList.contains('active'), "akira url is active");

    assert.ok($comics[1].href.indexOf('/comics/' + blackSad.get('slug')) >= 0, "blackSad url is correct");
    assert.notOk($comics[1].classList.contains('active'), "blackSad url is not active");

    assert.ok($comics[2].href.indexOf('/comics/' + calvinAndHobbes.get('slug')) >= 0, "calvinAndHobbes url is correct");
    assert.notOk($comics[2].classList.contains('active'), "calvinAndHobbes url is not active");
  });
  
  test("02 - Routing - 06 - Should display edit route", async function (assert) {
    assert.expect(7);
  
    await visit('/comics/akira/edit');
    
    let $selectedComic = find(".comic");
    assert.notEqual($selectedComic, null, "Current selected comics zone is displayed");

    let $form = find("form", $selectedComic);
    assert.notEqual($form, null, "Comic form exists");

    let $props = findAll(".comic form input");
    assert.equal($props.length, 4, "Comic properties exist");

    assert.ok($props[0].value.indexOf(akira.title) >= 0, "Comic title is correct");
    assert.ok($props[1].value.indexOf(akira.scriptwriter) >= 0, "Comic scriptwriter is correct");
    assert.ok($props[2].value.indexOf(akira.illustrator) >= 0, "Comic illustrator is correct");
    assert.ok($props[3].value.indexOf(akira.publisher) >= 0, "Comic publisher is correct");
  });
  
  test("02 - Routing - 07 - Should link to edit route", async function (assert) {
    assert.expect(4);
  
    await visit('/comics/akira');
    
    let $selectedComic = find(".comic");
    assert.notEqual($selectedComic, null, "Current selected comics zone is displayed");
  
    let $btnEdit = find(".btn-edit", $selectedComic);
    assert.notEqual($btnEdit, null, "Edit button exists");
  
    await click($btnEdit);
    assert.equal(currentRouteName(), 'comic.edit', "Route name is correct");
  
    let $form = find("form");
    assert.notEqual($form, null, "Comic form exists");
  });
  
  test("02 - Routing - 08 - Should display create route", async function (assert) {
    assert.expect(8);
  
    await visit('/comics/create');
  
    let $selectedComic = find(".comic");
    assert.notEqual($selectedComic, null, "Current selected comics zone is displayed");

    let $form = find("form", $selectedComic);
    assert.notEqual($form, null, "Comic form exists");

    let $props = findAll(".comic form input");
    assert.equal($props.length, 4, "Comic properties exist");
    assert.equal($props[0].value.length, 0, "Comic title is empty");
    assert.equal($props[1].value.length, 0, "Comic scriptwriter is empty");
    assert.equal($props[2].value.length, 0, "Comic illustrator is empty");
    assert.equal($props[3].value.length, 0, "Comic publisher is empty");
  
    let $comics = findAll(".comics .comics-list > .comics-list-item");
    assert.equal($comics.length, 4, "A new comic has been created");
  });
  
  test("02 - Routing - 09 - Should link to create route", async function (assert) {
    assert.expect(5);
  
    await visit('/comics');

    let $comics = findAll(".comics .comics-list > .comics-list-item");
    let comicsLength = $comics.length;
    assert.ok(comicsLength > 3, "Comics list displayed with more than 3 items");
  
    let $addComic = find(".add-comic");
    assert.notEqual($addComic, null, "Create button exists");
  
    await click($addComic);
    assert.equal(currentRouteName(), 'comics.create', "Route name is correct");
  
    let $form = find(".comic form");
    assert.notEqual($form, null, "Comic form exists");
  
    $comics = find(".comics .comics-list > .comics-list-item");
    assert.notEqual($comics, comicsLength + 1, "Comics list displayed with one supplementary item");
  });

});
