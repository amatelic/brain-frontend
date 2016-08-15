import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['overlay'],
  modal__animate: false,
  // self.set('brain__modal_animate', false);
  click(e) {
    if (this.$(e.target).hasClass('overlay')) {
      this.sendAction('complited', 'no');
    }
  },
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
