import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['tag'],
  didInsertElement() {
    this._super(...arguments);
    let {x, y} = this.getProperties('x', 'y');
    this.$().css({top: y, left: x});
  }
});
