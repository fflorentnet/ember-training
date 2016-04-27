import BaseAdapter from './application';

export default BaseAdapter.extend({

  urlForQueryRecord(query, modelName) {
    return this._buildURL(modelName) + "?_embed=albums";
  },

  urlForFindAll(modelName) {
    return this._buildURL(modelName) + "?_embed=albums";
  }
});
