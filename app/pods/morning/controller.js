import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Controller.extend({
  gratitudes: storageFor('gratitude'),
  goals: storageFor('goals'),
  // gratitudes: [
  //   'I am happy that i have a have a family',
  //   'I am happy that i learned something',
  // ],
  // goals: [
  //   'Create a 3d game for rust',
  //   'Start talking french',
  // ],
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
