import Ember from 'ember';

export default Ember.Route.extend({

  model: function () {
    // WARN : SOULD NOT BE DONE : We should not affect anything to windows but
    // for the exercice, we want to access to comics from console today
    window.comics = [{title: "Blacksad"}, {title: "Calvin and Hobbes", scriptwriter: "Bill Watterson"}];

    return window.comics;
  }
});
