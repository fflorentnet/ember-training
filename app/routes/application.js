import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    // WARN : SOULD NOT BE DONE : We should not affect anything to windows but
    // for the exercice, we want to access to comic from console today
    window.comic = {title: "BlackSad"};

    return window.comic;
  }
});
