import Ember from 'ember';
import moment from 'moment';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return {
      tasks: [
        {
          name: 'Meditate 10 minuts',
          description: 'bla bla',
          complited: true,
        },
        {
          name: 'Reading a book a day',
          description: 'To get more knowladge',
          complited: false,
        },
        {
          name: 'Do 100 suburies',
          description: 'For fun :)',
          complited: false,
        },
      ]
    };
  },
  actions: {
    addTask(task) {
      let obj = {
        name: task,
        description: '',
        complited: false,
      };
      let model = this.model();
      model.tasks.push(obj);
      this.controllerFor('tasks').set('model', model);
    },
    updateTask: function(target) {
      let tasks = this.controllerFor('tasks').get('model.tasks');
      tasks = tasks.map(task => (task.name === target.name)  ? target : task);
      this.controllerFor('tasks').set('model.tasks', tasks);
    },
  }
});
