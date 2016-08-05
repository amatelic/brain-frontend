import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['type', 'value'],
  classNames: ['onoffswitch'],
  checked: false,
  didInsertElement() {
    this._super(...arguments);
    if (this.get('checked')) {
      this.$('input').attr('checked', true);
    }
  },
  _updateElementValue: function() {
    this.set('checked', this.$('input').prop('checked'));
  },

  change: function(){
    this._updateElementValue();
    this.sendAction('toggleTask', this.get('value'), this.get('checked'));
  }
});
