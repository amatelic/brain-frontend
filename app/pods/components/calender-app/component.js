import Ember from 'ember';
import moment from 'moment';

const months =  [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

export default Ember.Component.extend({
  classNames: ['grid', 'grid--col','brain__design'],
  hiddeLeftPannel: false,
  hiddeRightPannel: false,
  now: moment(),
  type: 'day',
  months,

  monthName: Ember.computed('month', function() {
    return this.get('months')[this.get('month')];
  }),

  year: Ember.computed('now', function() {
    return this.get('now').year();
  }),

  month: Ember.computed('now', function() {
    return this.get('now').month();
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
    },

    changeType(type) {
      this.set('type', type);
    }
  }
});
