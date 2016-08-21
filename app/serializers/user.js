import JSONAPISerializer from 'ember-data/serializers/json-api';
import App from '../app';
export default JSONAPISerializer.extend({
  normalizeResponse(store, primaryModelClass, payload) {
    if (payload.meta) {
      App.storeMeta[primaryModelClass.modelName] = payload.meta; //ember data only allows meta data on 'query', this adds support for all other methods
    }
    return this._super(...arguments);
  }
});
