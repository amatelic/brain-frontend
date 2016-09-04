import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Graph from 'brain/graph/graph';
export default Ember.Route.extend(AuthenticatedRouteMixin, {
  brainNotification: Ember.inject.service(),
  graph: new Graph(),
  model() {
    return Ember.RSVP.hash({
      width: 400,
      height: 400,
      user: this.store.peekRecord('user', 1),
      option: this.get('graph').option(),
      messages: this.store.peekRecord('user', 1).get('messages'),
      graph: this.store.peekRecord('user', 1).get('tasks'),
    });
  },
  setupController(controller, model) {
    this._super(...arguments);
    // let messages = model.messages.toArray();
    // this.get('brainNotification').showArray(messages, 2000);
  },

  actions: {
    checkTask(task) {
      let user = this.store.peekRecord('user', 1);
      task.set('user', user);
      task.save();
    },

    modal(index) {
      this.send('openModal', 'modal.timer');
      this.controllerFor('application').set('selectedTaskIndex', index);
    }
  }
});
