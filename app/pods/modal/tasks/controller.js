import Ember from 'ember';

export default Ember.Controller.extend({
  init() {
    this._super(...arguments);
  },
  tasks: Ember.computed('model', function() {
    let index = this.get('model') - 1 ;
    return this.store.peekAll('task')
      .filter(d => d.get('days')[index]['tracking'])
      .map(d => {
      return {
        name: d.get('name'),
        complited: d.get('days')[index]['complited'],
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
