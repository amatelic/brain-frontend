import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),
  model() {
    let id = this.get('session.data.authenticated.user_id');
    this.store.peekRecord('user', id);
    
    return this.store.findAll('message');
  },
});
