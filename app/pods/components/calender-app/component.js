import Ember from 'ember';
import moment from 'moment';

function range(min, max) {
    return Array.apply(null, Array(max ? Math.abs(min - max)+1 : min)).map(function (a, i) {return i+(max?min:0);});
}
export default Ember.Component.extend({
  classNames: ['brain__calender'],
  hiddeLeftPannel: true,
  hiddeRightPannel: false,
  now: moment(),
  emptySpace: 0,
  year: Ember.computed('now', function() {
    return this.get('now').year();
  }),
  month: Ember.computed('now', function() {
    return this.get('now').month();
  }),
  daysInMonth: Ember.computed('year', 'month', function() {
    let {year, month} = this.getProperties('year','month');
    var startDate = moment([year, month]);
    this.set('emptySpace', startDate.weekday());
    let dates = new Array(startDate.weekday()).fill(0);
    var newArray = dates.concat(range(1, moment().daysInMonth() + 1));
    //Add extra elemnts on empty space
    if (newArray.length%7 !== 0) {
      let remains = newArray.length%7;
      newArray = newArray.concat(Array(7 - remains).fill(0))
    }
    return newArray;
  }),
  days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  months: [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ],
  monthName: Ember.computed('month', function() {
    return this.get('months')[this.get('month')];
  }),
  actions: {
    showModal(day) {
      this.sendAction('showModal', day);
    },
    changeDate(position) {
      let newValue = this.get('now').add(position, 'month');
      this.set('now', 0);
      this.set('now', newValue);
      this.sendAction('getNextMonth', this.get('month'));
    }
  }
});
