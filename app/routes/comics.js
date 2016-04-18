import Ember from 'ember';

let blackSad = {
  title: 'Blacksad',
  scriptwriter: 'Juan Diaz Canales',
  illustrator: 'Juanjo Guarnido',
  publisher: 'Dargaud'
};

let calvinAndHobbes = {
  title: 'Calvin and Hobbes',
  scriptwriter: 'Bill Watterson',
  illustrator: 'Bill Watterson',
  publisher: 'Andrews McMeel Publishing'
};

let akira = {
  title: 'Akira',
  scriptwriter: 'Katsuhiro Otomo',
  illustrator: 'Katsuhiro Otomo',
  publisher: 'Epic Comics'
};

export default Ember.Route.extend({
  init() {
    this._super(...arguments);
    this.store.createRecord('comic', akira);
    this.store.createRecord('comic', blackSad);
    this.store.createRecord('comic', calvinAndHobbes);
  },
  model () {
    return this.store.peekAll('comic');
  }
});
