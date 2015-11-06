import Ember from 'ember';
import Comic from 'ember-training/models/comic';

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
  scriptwriter: 'Katsuhiro Ôtomo',
  illustrator: 'Katsuhiro Ôtomo',
  publisher: 'Epic Comics'
});

let comics = [blackSad, calvinAndHobbes, akira];

export default Ember.Route.extend({
  model () {
    return comics;
  }
});
