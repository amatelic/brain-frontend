import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import SweetAlertMixin from 'ember-sweetalert/mixins/sweetalert-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, SweetAlertMixin, {
  model() {
    return Ember.RSVP.hash({
      tasks: this.store.findAll('task'),
    });
  },
  actions: {

    addTask(tasks) {
      let sweetAlert = this.get('sweetAlert');
      let task = this.store.createRecord('task', tasks);
      task.save().then(() => {
        this.store.unloadRecord(task);
        sweetAlert({ title: 'Task was created', type: "success" });
      }).catch(() => {
        sweetAlert({ title: 'There was a problem', type: "error" })
      });
    },

    updateTask: function(target) {
      let tasks = this.controllerFor('tasks').get('model.tasks');
      tasks = tasks.map(task => (task.name === target.name)  ? target : task);
      this.controllerFor('tasks').set('model.tasks', tasks);
    },
  }
});
