import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    // WARN : SHOULD NOT BE DONE : We should not affect anything to window but 
    // for the exercice, we want to access to comic from console today
    window.comics = [{title: "Blacksad"}, {title: "Calvin and Hobbes", scriptwriter:"Bill Watterson"}];

    return comics;
  }
});
