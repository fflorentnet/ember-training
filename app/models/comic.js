import DS from 'ember-data';
import { attr, hasMany } from '@ember-decorators/data'; 
import { computed } from '@ember-decorators/object';

const { Model } = DS;


export default class ComicModel extends Model {        
    @attr('string', { defaultValue: 'new' }) title;
    @attr('string') scriptwriter;
    @attr('string') illustrator;
    @attr('string') publisher;
    @attr('boolean', { defaultValue: false }) isFavorite;
    @hasMany('album') albums;

    @computed('title')
    get slug() {
        const title = this.get('title') || 'new';
        return title.dasherize();
    }
}