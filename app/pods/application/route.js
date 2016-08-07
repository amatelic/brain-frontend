import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
//https://github.com/chartjs/Chart.js/tree/v1.1.1/docs
export default Ember.Route.extend(ApplicationRouteMixin, {
  init() {
    this._super(...arguments);
    this.get('session').on('authenticationSucceeded', () => {
      // console.log(this.setController('application'));
      this.store.findRecord('user', 1).then((model) => {
        this.controllerFor('application').set('model', model);
        this.transitionTo('home');
      }).catch(err => console.log(err));
    });
  },
  model() {
    if (this.get('session.isAuthenticated')) {
      return this.store.findRecord('user', 1);
    }
  },
  afterModel() {
    this.transitionTo('home');
  },
  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    },
    complited(e) {
      this.controllerFor('application').set('showModal', false);
    }
  }
});
