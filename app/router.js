import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('comics', function() {
    this.route('comic', {path: '/:comic_slug', resetNamespace: true}, function() {
      this.route('edit');
    });
    this.route('create');
  });
});

export default Router;
