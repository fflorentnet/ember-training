import DS from 'ember-data';

export default DS.RESTSerializer.extend({

  normalizeArrayResponse(store, primaryModelClass, hash, id, requestType) {
    let newHash = {};
    newHash[primaryModelClass.modelName] = hash;
    return this._super(store, primaryModelClass, newHash, id, requestType);
  },

  normalizeSingleResponse(store, primaryModelClass, hash, id, requestType) {
    let newHash = {};
    newHash[primaryModelClass.modelName] = hash;
    return this._super(store, primaryModelClass, newHash, id, requestType);
  }
});
