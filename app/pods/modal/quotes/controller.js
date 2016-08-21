import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    complited() {
      this.send('closeModal');
    },
  },
});
