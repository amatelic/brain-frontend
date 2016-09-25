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
    return Ember.RSVP.hash({
      width: 400,
      height: 400,
      user: this.store.peekRecord('user', id),
      option: this.get('graph').option(),
      messages: this.store.peekRecord('user', id).get('messages'),
      graph: this.store.peekRecord('user', id).get('tasks'),
    });
  },

  afterModel() {
    let id = this.get('session.data.authenticated.user_id');
    let tasks = this.store.peekAll('task');
    if (Ember.isEmpty(tasks)) {
        // console.log(tasks.toArray());
        // this.controllerFor('home').set('model.user.tasks', tasks);
        // this.controllerFor('home').set('model.graph', tasks);
    }
  },
  actions: {
    checkTask(task) {
      let id = this.get('session.data.authenticated.user_id');
      let user = this.store.peekRecord('user', id);
      task.set('user', user);
      task.save().then(d => {
        console.log(d);
        let monthy = task.get('monthly');
        // this.set('monthy', monthy);
        // this.controllerFor('home').set('model.graph', this.store.peekAll('task'));
      });
    },

    modal(index) {
      this.send('openModal', 'modal.timer');
      this.controllerFor('application').set('selectedTaskIndex', index);
    }
  }
});
