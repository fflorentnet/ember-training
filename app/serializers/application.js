import Ember from 'ember';
import { assign } from '@ember/polyfills';
import DS from 'ember-data';

// eslint-disable-next-line no-undef
export default Ember.testing ? DS.RESTSerializer : DS.RESTSerializer.extend({
    serializeIntoHash(hash, typeClass, snapshot, options) {
      assign(hash, this.serialize(snapshot, options));
    },

    normalizeSingleResponse(store, primaryModelClass, hash, id, requestType) {
      let newHash = {};

      if (!hash[primaryModelClass.modelName]) {
        newHash[primaryModelClass.modelName] = hash;
      } else {
        newHash = hash;
      }

      return this._super(store, primaryModelClass, newHash, id, requestType);
    },

    normalizeArrayResponse(store, primaryModelClass, hash, id, requestType) {
      let newHash = {};
      newHash[primaryModelClass.modelName] = hash;
      return this._super(store, primaryModelClass, newHash, id, requestType);
    }
});
