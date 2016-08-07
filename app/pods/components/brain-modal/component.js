import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['overlay'],
  modal__animate: false,
  // self.set('brain__modal_animate', false);
  didRender() {
    this._super(...arguments);
    Ember.run.later(this, function() {
      this.set('modal__animate', true);
    }.bind(this), 50);
  },
  actions: {
    complited(value) {
      this.sendAction('complited', value);
    }
  },
});
