import Ember from 'ember';

function getDates() {
  return JSON.parse(JSON.stringify(
    [
      {name: 'M', work: 0},
      {name: 'T', work: 0},
      {name: 'W', work: 0},
      {name: 'T', work: 0},
      {name: 'F', work: 0},
      {name: 'S', work: 0},
      {name: 'S', work: 0}
    ]
  ));
}

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  name: '',
  time: '',
  dates: getDates(),
  actions: {
    add(data) {
      let {name, time, dates} = this.getProperties('name', 'time', 'dates');
      let model = this.get('model');

      if (Ember.isEmpty(name) || Ember.isEmpty(time)) {
        return alert('You didn\'t add all values');
      }

      model.addObject({
        name, time, dates,
      });

      name = '';
      time = '';
      this.set('name', '');
      this.set('time', '');
      this.set('dates', getDates());
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
