import Ember from 'ember';
import moment from 'moment';

function range(min, max) {
    return Array.apply(null, Array(max ? Math.abs(min - max)+1 : min)).map(function (a, i) {return i+(max?min:0);});
}
export default Ember.Component.extend({
  classNames: ['brain__calender'],
  now: moment(),
  year: Ember.computed('now', function() {
    return this.get('now').year();
  }),
  month: Ember.computed('now', function() {
    return this.get('now').month();
  }),
  daysInMonth: Ember.computed('year', 'month', function() {
    let {year, month} = this.getProperties('year','month');
    var startDate = moment([year, month]);
    let b = new Array(startDate.weekday()).fill(0);
    return b.concat(range(1, moment().daysInMonth() + 1));
  }),
  days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  init() {
    this._super(...arguments);
  },

  actions: {
    changeDate(position) {
      let newValue = this.get('now').add(position, 'month');
      this.set('now', 0);
      this.set('now', newValue);
      // this.get('month').add(1, 'month');
    }
  }
});
