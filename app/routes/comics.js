import Route from '@ember/routing/route';
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
  scriptwriter: 'Katsuhiro Ôtomo',
  illustrator: 'Katsuhiro Ôtomo',
  publisher: 'Epic Comics'
});

const comics = [blackSad, calvinAndHobbes, akira];

export default Route.extend({

  model() {
    return comics;
  }
});
