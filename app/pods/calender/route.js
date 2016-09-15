import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model() {
    let id = this.get('session.data.authenticated.user_id');
    return this.store.peekRecord('user', id).get('tasks');
  },
  actions: {
    getNextMonth(month) {
      month = month;
      this.store.unloadAll('task');
      this.get('store').query('task', {
        filter: {
          month
        }
      }).then(function(d) {
        if (!Ember.isEmpty(d.toArray())) {
          this.controllerFor('calender').set('model', d);
        }
      }.bind(this));
    }
    ,
    showModal(day) {
      this.send('openModal', 'modal.tasks', day);
    }
  }
});
