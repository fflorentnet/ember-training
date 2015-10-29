import Route from '@ember/routing/route';
   
export default Route.extend({

  model() {
    // WARN : SOULD NOT BE DONE : We should not affect anything to windows but
    // for the exercice, we want to access to comics from console today
    window.comics = [{title: "BlackSad"}, {title: "Calvin and Hobbes", scriptwriter: "Bill Watterson"}];

    return window.comics;
  }
});
