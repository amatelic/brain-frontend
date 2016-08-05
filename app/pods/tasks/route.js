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
    addTask(title) {
      let days = moment().daysInMonth();
      let user = this.store.peekRecord('user', 1);
      let task = this.store.createRecord('task', {
        name: title,
        description: '',
        complited: false,
        monthly: Array(days).fill(0),
        user: user
      });

      task.save();
    },
    updateTask: function(target) {
      let tasks = this.controllerFor('tasks').get('model.tasks');
      tasks = tasks.map(task => (task.name === target.name)  ? target : task);
      this.controllerFor('tasks').set('model.tasks', tasks);
    },
  }
});
