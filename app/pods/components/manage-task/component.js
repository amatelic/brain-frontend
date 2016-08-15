import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['brain__card'],
    areComplited: Ember.computed('tasks.@each.complited', function() {
      let tasks= this.get('tasks');
      return `${tasks.filterBy('complited', true).length}/${tasks.toArray().length}`;

    }),
    actions: {
      toggleTask(task) {
        this.sendAction('checkTask', task);
      }
    }
});
