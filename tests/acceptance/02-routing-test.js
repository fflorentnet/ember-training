import Ember from "ember";
import { test } from 'qunit';
import moduleForAcceptance from '../helpers/module-for-acceptance';

const blackSad = Ember.Object.create({
  slug: 'blacksad',
  title: 'Blacksad',
  scriptwriter: 'Juan Diaz Canales',
  illustrator: 'Juanjo Guarnido',
  publisher: 'Dargaud'
});

const calvinAndHobbes = Ember.Object.create({
  slug: 'calvin-and-hobbes',
  title: 'Calvin and Hobbes',
  scriptwriter: 'Bill Watterson',
  illustrator: 'Bill Watterson',
  publisher: 'Andrews McMeel Publishing'
});

const akira = Ember.Object.create({
  slug: 'akira',
  title: 'Akira',
  scriptwriter: 'Katsuhiro Otomo',
  illustrator: 'Katsuhiro Otomo',
  publisher: 'Epic Comics'
});

moduleForAcceptance('02 - Routing Acceptance Tests');

test("02 - Routing - 01 - Should display second level title", function (assert) {
  assert.expect(4);

  visit('/comics');
  andThen(() => {
    assert.equal(find('.application').length, 1, "Page contains an application container");

    let $pageHeader = find('.application .header');
    assert.equal($pageHeader.length, 1, "Page contains a page header");

    let $title = find(".application .comics .comics-title");
    assert.equal($title.length, 1, "Page contains a .comics-title element");
    assert.equal($title.text(), "Comics list", "Subtitle is correct");
  });
});

test("02 - Routing - 02 - Should display text on comics/", function (assert) {
  assert.expect(1);

  visit('/comics');
  andThen(() => {
    assert.ok(find("#no-selected-comic").text().indexOf("Please select on comic book for detailled information.") >= 0, "No selected comics text is displayed");
  });
});

test("02 - Routing - 03 - Should display single comic zone", function (assert) {
  assert.expect(1);

  visit('/comics/akira');
  andThen(() => {
    assert.equal(find(".comic").length, 1, "Current selected comics zone is displayed");
  });
});

test("02 - Routing - 04 - Should display the comic detail", function (assert) {
  assert.expect(7);

  visit('/comics/akira');
  andThen(() => {
    let $selectedComic = find(".comic");
    assert.equal($selectedComic.length, 1, "Current selected comics zone is displayed");

    let $title = $selectedComic.find(".comic-title");
    assert.equal($title.length, 1, "Comic title exists");
    assert.ok($title.text().indexOf(akira.get('title')) >= 0, "Comic title is correct");

    let $props = $selectedComic.find(".comic-description > .comic-value");
    assert.equal($props.length, 3, "Comic properties exist");
    assert.ok($($props.get(0)).text().indexOf(akira.get('scriptwriter')) >= 0, "Comic scriptwriter is correct");
    assert.ok($($props.get(1)).text().indexOf(akira.get('illustrator')) >= 0, "Comic illustrator is correct");
    assert.ok($($props.get(2)).text().indexOf(akira.get('publisher')) >= 0, "Comic publisher is correct");
  });
});

test("02 - Routing - 05 - Should display links", function (assert) {
  assert.expect(7);

  visit('/comics/akira');
  andThen(() => {
    let $comics = find(".comics .comics-list > .comics-list-item > a");
    assert.ok($comics.length >= 3, "Comics are displayed");

    assert.ok($($comics.get(0)).attr('href').indexOf('/comics/' + akira.get('slug')) >= 0, "akira url is correct");
    assert.ok($($comics.get(0)).hasClass('active'), "akira url is active");

    assert.ok($($comics.get(1)).attr('href').indexOf('/comics/' + blackSad.get('slug')) >= 0, "blackSad url is correct");
    assert.notOk($($comics.get(1)).hasClass('active'), "blackSad url is not active");

    assert.ok($($comics.get(2)).attr('href').indexOf('/comics/' + calvinAndHobbes.get('slug')) >= 0, "calvinAndHobbes url is correct");
    assert.notOk($($comics.get(2)).hasClass('active'), "calvinAndHobbes url is not active");
  });
});

test("02 - Routing - 06 - Should display edit route", function (assert) {
  assert.expect(7);

  visit('/comics/akira/edit');
  andThen(() => {
    let $selectedComic = find(".comic");
    assert.equal($selectedComic.length, 1, "Current selected comics zone is displayed");

    let $form = $selectedComic.find("form");
    assert.equal($form.length, 1, "Comic form exists");

    let $props = $selectedComic.find("input");
    assert.equal($props.length, 4, "Comic properties exist");
    assert.ok($($props.get(0)).val().indexOf(akira.title) >= 0, "Comic title is correct");
    assert.ok($($props.get(1)).val().indexOf(akira.scriptwriter) >= 0, "Comic scriptwriter is correct");
    assert.ok($($props.get(2)).val().indexOf(akira.illustrator) >= 0, "Comic illustrator is correct");
    assert.ok($($props.get(3)).val().indexOf(akira.publisher) >= 0, "Comic publisher is correct");
  });
});

test("02 - Routing - 07 - Should link to edit route", function (assert) {
  assert.expect(4);

  visit('/comics/akira');
  andThen(() => {
    let $selectedComic = find(".comic");
    assert.equal($selectedComic.length, 1, "Current selected comics zone is displayed");

    let $btnEdit = $selectedComic.find(".btn-edit");
    assert.equal($btnEdit.length, 1, "Edit button exists");

    click($btnEdit);
    andThen(() => {
      assert.equal(currentRouteName(), 'comic.edit', "Route name is correct");

      let $form = find("form");
      assert.equal($form.length, 1, "Comic form exists");
    });
  });
});

test("02 - Routing - 08 - Should display create route", function (assert) {
  assert.expect(8);

  visit('/comics/create');
  andThen(() => {
    let $selectedComic = find(".comic");
    assert.equal($selectedComic.length, 1, "Current selected comics zone is displayed");

    let $form = $selectedComic.find("form");
    assert.equal($form.length, 1, "Comic form exists");

    let $props = $selectedComic.find("input");
    assert.equal($props.length, 4, "Comic properties exist");
    assert.equal($($props.get(0)).val().length, 3, "Comic title is default value");
    assert.equal($($props.get(1)).val().length, 0, "Comic scriptwriter is empty");
    assert.equal($($props.get(2)).val().length, 0, "Comic illustrator is empty");
    assert.equal($($props.get(3)).val().length, 0, "Comic publisher is empty");

    let $comics = find(".comics .comics-list > .comics-list-item");
    assert.equal($comics.length, 4, "A new comic has been created");
  });
});

test("02 - Routing - 09 - Should link to create route", function (assert) {
  assert.expect(5);

  visit('/comics');
  andThen(() => {
    let $comics = find(".comics .comics-list > .comics-list-item");
    let comicsLength = $comics.length;
    assert.ok(comicsLength === 3, "Comics list displayed with exactly 3 items");

    let $addComic = find(".add-comic");
    assert.equal($addComic.length, 1, "Create button exists");

    click($addComic);
    andThen(() => {
      assert.equal(currentRouteName(), 'comics.create', "Route name is correct");

      let $form = find(".comic form");
      assert.equal($form.length, 1, "Comic form exists");

      $comics = find(".comics .comics-list > .comics-list-item");
      assert.equal($comics.length, comicsLength + 1, "Comics list displayed with one supplementary item");
    });
  });
});
