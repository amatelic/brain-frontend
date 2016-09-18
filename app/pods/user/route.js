import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    let id = this.get('session.data.authenticated.user_id');
    return this.store.findRecord('user', id);
  },
  actions: {
    changePrice(price) {
      this.controllerFor('user').set('model.plan', price);
    }
  }
});
