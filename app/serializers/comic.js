import DS from 'ember-data';
import BaseSerializer from './application';
import {isEmberArray as isArray } from 'ember-array/utils';

export default BaseSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    albums: {
      serialize: 'ids',
      deserialize: 'records'
    }
  },

  normalizeSingleResponse(store, primaryModelClass, hash, id, requestType) {
    let newHash = hash;
    if (hash && isArray(hash)) {
      newHash = hash[0];
    } 
    return this._super(store, primaryModelClass, newHash, id, requestType);
  }
});
