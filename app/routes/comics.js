import Route from '@ember/routing/route';
import { inject as service } from '@ember-decorators/service';

export default class ComicsRoute extends Route {

  @service store;

  model () {
    return this.store.findAll('comic');
  }
};
