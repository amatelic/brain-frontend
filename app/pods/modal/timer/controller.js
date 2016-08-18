import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    com(value) {
      if (value) {
        this.send('complited', value);
      }
      this.send('closeModal');
    },
  }
});
