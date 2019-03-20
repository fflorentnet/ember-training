import Component from '@ember/component';
import { argument } from '@ember-decorators/argument';
import { required } from '@ember-decorators/argument/validation';
import { Any } from '@ember-decorators/argument/types';
import { type } from '@ember-decorators/argument/type';

export default class ComicAlbumComponent extends Component {
    @argument
    @required
    @type(Any) 
    model;
}