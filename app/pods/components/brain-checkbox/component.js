import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['type', 'value'],
  tagName: 'input',
  type: 'checkbox',
  checked: false,
  didInsertElement() {
    this._super(...arguments);
    if (this.get('checked')) {
      this.$().attr('checked', true);
    }
  },
  _updateElementValue: function() {
    this.set('checked', this.$().prop('checked'));
  },

  change: function(){
    this._updateElementValue();
    this.sendAction('toggleTask', this.get('value'), this.get('checked'));
  }
});
