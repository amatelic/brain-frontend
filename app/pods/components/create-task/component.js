import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['brain__card'],
  actions: {
    createNewTask(target) {
      if (!Ember.isEmpty(target)) {
        this.sendAction('addTask', target);
        this.set('new_task', '');
      }
    }
  }
});
