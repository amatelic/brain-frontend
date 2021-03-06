import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Graph from 'brain/graph/graph';
export default Ember.Route.extend(AuthenticatedRouteMixin, {
  brainNotification: Ember.inject.service(),
  session: Ember.inject.service('session'),
  graph: new Graph(),

  model() {
    let id = this.get('session.data.authenticated.user_id');
    return Ember.RSVP.hash({
      width: 400,
      height: 400,
      user: this.store.findRecord('user', id),
      option: this.get('graph').option(),
      tasks: this.store.findAll('task'),
      // messages: this.store.peekRecord('user', id).get('messages'),
      // graph: this.store.findAll('task'),
    });
  },

  actions: {
    checkTask(task) {
      let id = this.get('session.data.authenticated.user_id');
      let user = this.store.peekRecord('user', id);
      task.set('user', user);
      task.save().then(() => {
        this.controllerFor('home').set('model.user.tasks', this.store.peekAll('task'));
        this.controllerFor('home').set('model.tasks', this.store.peekAll('task'));
      });
    },

    modal(index) {
      this.send('openModal', 'modal.timer');
      this.controllerFor('application').set('selectedTaskIndex', index);
    }
  }
});
