import Ember from 'ember';
import moment from 'moment';
export default Ember.Component.extend({
  attributeBindings: ['type', 'value'],
  classNames: ['onoffswitch'],
  areComplited: Ember.observer('task.complited', function() {
    this.$('input').attr('checked', this.get('task.complited'));
  }),
  didInsertElement() {
    this._super(...arguments);
    let day = moment().date();
    //day has to be zero based because of the data base
    let today = this.get('task.days')[day - 1];
    let weekIndex = moment().day();
    let schedule = this.get('task.schedule');
    if (today.complited !== 0) {
      this.$('input').attr('checked', today.complited);
    }
    if (!schedule[weekIndex]) {
      this.$('input').attr('disabled', !schedule[weekIndex]);
      this.$('label').addClass('disabled');
    }
  },

  change: function(){
    this.toggleProperty('task.complited');
    this.sendAction('toggleTask', this.get('task'), this.get('task.complited'));
  }
});
