import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['brain__card'],
    actions: {
      toggleComplited(task, index) {
        // let selectedTask = this.get('tasks').objectAt(index);
        this.sendAction('updateTask', task);
      },
      toggleTask(task, complited) {
        Ember.set(task, 'complited', complited);
        this.sendAction('updateTask', task);
      }
    }
});
