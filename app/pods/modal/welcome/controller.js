import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    complited(condition) {
      if (condition) {
        window.open("http://brain.app//tutorial", "Brain blog");
      }
      this.send('closeModal');
    },
  }
});
