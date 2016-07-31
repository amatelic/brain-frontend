import Ember from 'ember';
import moment from 'moment';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return Ember.RSVP.all([
      this.store.peekAll('task')
    ]).then(res => {
      return {tasks: res[0]};
    });
  },
  actions: {
    addTask(task) {
      this.store.push({
        data: [{
          id: Math.random(),
          type: 'task',
          attributes: {
            name: task,
            description: '',
            complited: false
          }
        }]
      });
    },
    updateTask: function(target) {
      let tasks = this.controllerFor('tasks').get('model.tasks');
      tasks = tasks.map(task => (task.name === target.name)  ? target : task);
      this.controllerFor('tasks').set('model.tasks', tasks);
    },
  }
});
