import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Controller.extend({
  gratitudes: storageFor('gratitude'),
  goals: storageFor('goals'),
  actions: {
    addGratitude(e) {
      if (e.which === 13) {
        this.get('gratitudes').addObject(e.target.value);
      }
    },
    addGoals(e) {
      if (e.which === 13) {
        this.get('goals').push(e.target.value);
      }
    }
  }
});
