import Ember from 'ember';
import Time from '../../../utility/timeformatter';
export default Ember.Component.extend({
  classNames: ['brain__card'],
  dates: [
      { name: 'S',schedule: 0},
      { name: 'M',schedule: 0},
      { name: 'T',schedule: 0},
      { name: 'W',schedule: 0},
      { name: 'T',schedule: 0},
      { name: 'F',schedule: 0},
      { name: 'S',schedule: 0}
    ],

  generateDays(schedule)  {
    let wholeMonth = moment().daysInMonth();
    let dd = moment([moment().year(), moment().month()]);
    let days = [];
    for (let i = 1; i <= wholeMonth; i++) {
      days.push({
        comlited: 0, day: i,
        tracking: schedule[dd.day()],
      });
      dd.add(1, 'days').day();
    }
    return days;
  },
  actions: {
    createNewTask(name, time) {
      if (!Ember.isEmpty(name, time)) {
        let schedule = this.get('dates').toArray().map(d => Boolean(d.schedule));
        let days = this.generateDays(schedule);
        time = Time.getSecs(time, "HH:MM");
        this.sendAction('addTask', {name, time, schedule, days,
        year: parseInt(moment().year()), month: parseInt(moment().month())});
        this.setProperties({ name: '', time: ''});
        this.get('dates').map(d => Ember.set(d, 'schedule', 0));
        // /d.set('schedule', 0)
      }
    },
  }
});
