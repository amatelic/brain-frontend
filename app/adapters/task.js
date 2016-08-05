import JSONAPIAdapter from 'ember-data/adapters/json-api';
import ENV from 'brain/config/environment';
import Ember from 'ember';

export default JSONAPIAdapter.extend({
  session: Ember.inject.service('session'),
  host: ENV.backend.url,
  headers: Ember.computed('session.data.authenticated.access_toke', function() {
    return {
      'Api-key': this.get('session.data.authenticated.access_token')
    };
  }),
  generateIdForRecord: function() {
    return this.store.peekAll('task').toArray().length;
  },
});
