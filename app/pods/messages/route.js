import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),
  model() {
    let id = this.get('session.data.authenticated.user_id');
    let user = this.store.peekRecord('user', id);
    return this.store.findAll('message');
  },
});
