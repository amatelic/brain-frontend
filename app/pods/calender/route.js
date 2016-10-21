import Ember from 'ember';
import ENV from 'brain/config/environment';
let {A} = Ember;

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model() {
    let id = this.get('session.data.authenticated.user_id');
    return this.store.peekRecord('user', id).get('tasks');
  },

  actions: {
    getNextMonth(month, year) {
      month = month;
      year=2016;
      fetch(`${ENV.backend.url}/tasks?filter%5Bmonth%5D=${month}&filter%5Byear%5D=${month}`, {
        method: 'GET',
        headers: {
          'Api-key': this.get('session.data.authenticated.access_token')
        }
      })
      .then(d => d.json())
      .then(json => {
        let data = json.data.map(d => {
          let obj = d.attributes;
          obj.id = d.id
          return Ember.Object.create(obj);
        });
        this.controllerFor('calender').set('model', A(data));
      });
    },
    showModal(day) {
      this.send('openModal', 'modal.tasks', day);
    },

  }
});
