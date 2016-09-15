import Ember from 'ember';
import moment from 'moment';
export default Ember.Component.extend({
  attributeBindings: ['type', 'value'],
  classNames: ['onoffswitch'],
  // attributeBindings:["checked"],
  // checked: Ember.computed("task.complited", function() {
  //   return this.get('task.complited');
  // }),
  areComplited: Ember.observer('task.complited', function() {
    this.$('input').attr('checked', this.get('task.complited'));
  }),
  didInsertElement() {
    this._super(...arguments);
    let day = moment().date();
    let today = this.get('task.days')[day];
    if (today.complited !== 0) {
      this.$('input').attr('checked', today.complited);
    }
    if (!today.tracking) {
      this.$('input').attr('disabled', !today.tracking);
      this.$('label').addClass('disabled');
    }
  },

  change: function(){
    this.toggleProperty('task.complited');
    this.sendAction('toggleTask', this.get('task'), this.get('task.complited'));
  }
});
