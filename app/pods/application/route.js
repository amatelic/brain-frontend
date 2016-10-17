import Ember from 'ember';
import App from '../../app';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { storageFor } from 'ember-local-storage';

export default Ember.Route.extend(ApplicationRouteMixin, {
  welcome: storageFor('beginner'),
  websockets: Ember.inject.service('socket-io'),
  brainNotification: Ember.inject.service(),
  session: Ember.inject.service('session'),
  init() {
    this._super(...arguments);

    this.get('session').on('authenticationSucceeded', () => {
      let id = this.get('session.data.authenticated.user_id');
      this.store.findRecord('user', id).then((model) => {
        this.controllerFor('application').set('model', model);
        // this.transitionTo('home');
      }).catch(err => console.log(err));
    });
  },
  beforeModel() {
    // if (!this.get('session.isAuthenticated')) {
    //   this.transitionTo('home');
    // }
  },
  model() {
    if (this.get('session.isAuthenticated')) {
      let id = this.get('session.data.authenticated.user_id');
      return Ember.RSVP.hash({
        user: this.store.findRecord('user', id),
      });
    }
  },
  afterModel() {
    this.get('session').on('authenticationSucceeded', () => {
      Ember.run.schedule('render', function() {
        if (this.get('welcome.show')) {
          // this.send('openModal', 'modal.welcome', []);
          // this.set('welcome.show', false);
        }
      }.bind(this));
    });

    Ember.run.later(this, function() {
      let meta = App.storeMeta['user'];
      if (meta.quote) {
        // this.send('openModal', 'modal.welcome', []);
        // this.send('openModal', 'modal.quotes', meta.quote);
      }
    }, 1000);
  },

  willDestroy() {
    this._super(...arguments);
    const socket = this.get('socketRef');
    socket.off('open', () => console.log('Channel open was closed'));
    socket.off('message', () => console.log('Channel message was closed'));
    socket.off('close', () => console.log('Channel close was closed'));
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
