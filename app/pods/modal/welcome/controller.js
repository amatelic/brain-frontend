import Ember from 'ember';

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
      { name: 'M',schedule: 0},
      { name: 'T',schedule: 0},
      { name: 'W',schedule: 0},
      { name: 'T',schedule: 0},
      { name: 'F',schedule: 0},
      { name: 'S',schedule: 0},
      { name: 'S',schedule: 0}];
  }),
  actions: {
    add(data) {
      let {name, time, dates} = this.getProperties('name', 'time', 'dates');
      let model = this.get('model');

      if (Ember.isEmpty(name) || Ember.isEmpty(time)) {
        return alert('You didn\'t add all values');
      }
      dates = dates.map(d => Boolean(d.schedule));
      
      model.addObject({
        name, time, dates,
      });

      name = '';
      time = '';
      this.set('name', '');
      this.set('time', '');
      this.set('schedule', getDates());
    },
    complited(condition) {
      console.log(condition);
      // if (condition) {
        // window.open("http://brain.app//tutorial", "Brain blog");
      // }
      this.send('closeModal');
    },
  }
});
