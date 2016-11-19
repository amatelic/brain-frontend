import Ember from 'ember';
import moment from 'moment';
import range from '../../../../utils/range';
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default Ember.Component.extend({
  classNames: ['full-size'],
  days, year: null, month: null,

  daysInMonth: Ember.computed('year', 'month', function() {
    let {year, month} = this.getProperties('year','month');
    var startDate = moment([year, month]);
    this.set('emptySpace', startDate.weekday());
    let dates = new Array(startDate.weekday()).fill(0);
    var newArray = dates.concat(range(1, startDate.daysInMonth()));
    //Add extra elements on empty space
    if (newArray.length%7 !== 0) {
      let remains = newArray.length%7;
      newArray = newArray.concat(Array(7 - remains).fill(0));
    }
    return newArray;
  }),

  actions: {
    showModal(day) {
      this.sendAction('showModal', day);
    }
  }
});
