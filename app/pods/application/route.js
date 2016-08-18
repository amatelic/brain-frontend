import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { storageFor } from 'ember-local-storage';

export default Ember.Route.extend(ApplicationRouteMixin, {
  welcome: storageFor('beginner'),
  init() {
    this._super(...arguments);
    this.get('session').on('authenticationSucceeded', () => {
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
    this.get('session').on('authenticationSucceeded', () => {
      this.transitionTo('home');
      if (this.get('welcome.show')) {
        Ember.run.later(this, function() {
          this.send('openModal', 'modal.welcome');
        }, 500);
      }
    });
  },
  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    },
    complited(e) {
      // this.controllerFor('application').set('showModal', false);
      let index = this.controllerFor('application').get('selectedTaskIndex');
      let task = this.controllerFor('home').get('model.user.tasks').objectAt(index);
      task.set('complited', e);
      task.save();
    },
    openModal: function(name, model) {
      return this.render(name, {
        into: 'application',
        outlet: 'modal',
        controller: name,
        model: model,
      });
    },
    closeModal: function() {
      return this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    }
  }
});
