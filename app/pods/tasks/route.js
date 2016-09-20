import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import moment from 'moment';
export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return Ember.RSVP.hash({
      tasks: this.store.peekAll('task'),
    });
  },
  actions: {
    addTask(tasks) {
      let id = this.get('session.data.authenticated.user_id');
      let user = this.store.peekRecord('user', id);
      let task = this.store.createRecord('task', tasks);

      task.save();
    },
    updateTask: function(target) {
      let tasks = this.controllerFor('tasks').get('model.tasks');
      tasks = tasks.map(task => (task.name === target.name)  ? target : task);
      this.controllerFor('tasks').set('model.tasks', tasks);
    },
  }
});
