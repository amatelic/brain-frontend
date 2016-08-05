import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['brain__card'],
    actions: {
      toggleTask(task) {
        this.sendAction('checkTask', task);
      }
    }
});
