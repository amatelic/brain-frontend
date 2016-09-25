import Ember from 'ember';
import Time from '../../../utility/timeformatter';
import moment from 'moment';
console.log(Time)
function getDates() {
  return JSON.parse(JSON.stringify([0, 0, 0, 0, 0, 0, 0,]));
}

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  name: '',
  time: '',
  schedule: getDates(),
  dates: Ember.computed('schedule', function() {
    return [
      { name: 'S',schedule: 0},
      { name: 'M',schedule: 0},
      { name: 'T',schedule: 0},
      { name: 'W',schedule: 0},
      { name: 'T',schedule: 0},
      { name: 'F',schedule: 0},
      { name: 'S',schedule: 0}
    ];
  }),
  actions: {
    add(data) {
      let {name, time, dates} = this.getProperties('name', 'time', 'dates');
      let model = this.get('model');

      if (Ember.isEmpty(name) || Ember.isEmpty(time)) {
        return alert('You didn\'t add all values');
      }
      time = Time.getSecs(time);
      let schedule = dates.map(d => Boolean(d.schedule));
      let days = Time.generateDays(schedule);
      model.addObject({name, time, schedule, days});
      this.setProperties({name: '', time: ''});
      this.set('schedule', getDates());
    },
    complited(condition) {
      let id = this.get('session.data.authenticated.user_id');
      let user = this.store.peekRecord('user', id);
      console.log(user.get('name'));
      this.get('model').toArray().forEach((model, index) => {
        model.id = index + 1;
        let task = this.store.createRecord('task', model);
        user.get('tasks').pushObject(task);
        task.save();
      });
      // user.save();
      // if (condition) {
        // window.open("http://brain.app//tutorial", "Brain blog");
      // }
      this.send('closeModal');
    },
  }
});
