import Ember from 'ember';
let { set } = Ember;

export default Ember.Component.extend({
  classNames: ['brain__design'],
  dates: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  updateTask: [true, true, true, true, true, true, true],
  getTasks: Ember.computed('updateTask', function() {
    return this.get('tasks');
  }),
  onDataChange: Ember.computed('tasks.@each.name',
  'tasks.@each.time', function() {
    return this.get('tasks').reduce((p, n) => {
      return (p) ? true : n.get('hasDirtyAttributes');
    }, false);
  }),
  actions: {
    
    updateTask(task, index) {
      let selectedTask = this.updateTask.toArray();
      let newValue = !selectedTask[index];
      selectedTask[index] = newValue;
      set(this, 'updateTask', selectedTask);
    },

    deleteTask(task) {
      console.log('delete', task);
    },
  }
});
