import Route from '@ember/routing/route';
   
export default Route.extend({

  model() {
    // WARN : SOULD NOT BE DONE : We should not affect anything to windows but
    // for the exercice, we want to access to comic from console today
    window.comic = {title: "BlackSad"};

    return window.comic;
  }
});
