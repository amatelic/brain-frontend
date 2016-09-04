import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.store.findRecord('user', 1);
  },
  actions: {
    changePrice(price) {
      this.controllerFor('user').set('model.plan', price);
    }
  }
});
