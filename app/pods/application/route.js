import Ember from 'ember';
import App from '../../app';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { storageFor } from 'ember-local-storage';

export default Ember.Route.extend(ApplicationRouteMixin, {
  welcome: storageFor('beginner'),
  session: Ember.inject.service('session'),
  init() {
    this._super(...arguments);
    this.get('session').on('authenticationSucceeded', () => {
      let id = this.get('session.data.authenticated.user_id');
      this.store.findRecord('user', id).then((model) => {
        this.controllerFor('application').set('model', model);
        this.transitionTo('home');
      }).catch(err => console.log(err));
    });
  },
  model() {
    if (this.get('session.isAuthenticated')) {
      let id = this.get('session.data.authenticated.user_id');
      return this.store.findRecord('user', id);
    } else {
      this.transitionTo('login');
    }
  },
  afterModel() {
    this.get('session').on('authenticationSucceeded', () => {
      this.transitionTo('home');
      Ember.run.schedule('render', function() {
        if (this.get('welcome.show')) {
          this.send('openModal', 'modal.welcome');
          this.set('welcome.show', false);
        } else {
          let meta = App.storeMeta['user'];
          if (meta) {
            this.send('openModal', 'modal.qoute', meta);
          }
        }
      }.bind(this));
    });

    Ember.run.later(this, function() {
      let meta = App.storeMeta['user'];
      if (meta) {
        this.send('openModal', 'modal.quotes', meta);
      }
    }, 500);
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
