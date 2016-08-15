import Ember from 'ember';

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
    if (this.get('task.complited')) {
      this.$('input').attr('checked', this.get('task.complited'));
    }
  },
  _updateElementValue: function() {
    this.set('task.complited', this.$('input').prop('checked'));
    this.set('checked', this.$('input').prop('checked'));
  },

  change: function(){
    this._updateElementValue();
    this.sendAction('toggleTask', this.get('task'), this.get('task.complited'));
  }
});
