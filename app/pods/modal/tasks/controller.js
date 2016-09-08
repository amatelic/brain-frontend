import Ember from 'ember';

export default Ember.Controller.extend({
  init() {
    this._super(...arguments);
  },
  tasks: Ember.computed('model', function() {
    let index = this.get('model');
    return this.store.peekAll('task').map(d => {
      return {
        name: d.get('name'),
        complited: d.get('monthly').objectAt(index - 1),
      };
    });
  }),
  actions: {
    com(value) {
      if (value) {
        this.send('complited', value);
      }
      this.send('closeModal');
    },
  }
});
