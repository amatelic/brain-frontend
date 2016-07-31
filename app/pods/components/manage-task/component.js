import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['brain__card'],
    actions: {
      toggleTask(task, complited) {
        this.sendAction('checkTask', task);
      }
    }
});
