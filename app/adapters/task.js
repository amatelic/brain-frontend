import JSONAPIAdapter from 'ember-data/adapters/json-api';
import ENV from 'brain/config/environment';

export default JSONAPIAdapter.extend({
  session: Ember.inject.service('session'),
  host: ENV.backend.url,
  headers: Ember.computed('session.data.authenticated.access_toke', function() {
    return {
      'API_KEY': this.get('session.data.authenticated.access_token')
    };
  }),
});
