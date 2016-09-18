import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Graph from 'brain/graph/graph';
import moment from 'moment';
export default Ember.Route.extend(AuthenticatedRouteMixin, {
  brainNotification: Ember.inject.service(),
  session: Ember.inject.service('session'),
  graph: new Graph(),
  model() {
    let id = this.get('session.data.authenticated.user_id');
    let user = this.store.peekRecord('user', id)
    user.get('messages').then( (d) => console.log(d.get('name')));
    return Ember.RSVP.hash({
      width: 400,
      height: 400,
      user: this.store.peekRecord('user', id),
      option: this.get('graph').option(),
      messages: this.store.peekRecord('user', id).get('messages'),
      graph: this.store.peekRecord('user', id).get('tasks'),
    });
  },
  setupController(controller, model) {
    this._super(...arguments);
    // let messages = model.messages.toArray();
    // this.get('brainNotification').showArray(messages, 2000);
  },

  actions: {
    checkTask(task) {
      let id = this.get('session.data.authenticated.user_id');
      let user = this.store.peekRecord('user', id);
      // monthy[moment().date() - 1] = 1;
      // task.set('user', user);
      // task.save().then(d => {
        // let monthy = task.get('monthly');
        // this.set('monthy', monthy);
        // this.controllerFor('home').set('model.graph', this.store.peekAll('task'));
      // });
    },

    modal(index) {
      this.send('openModal', 'modal.timer');
      this.controllerFor('application').set('selectedTaskIndex', index);
    }
  }
});
