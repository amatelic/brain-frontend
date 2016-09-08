import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['overlay'],
  modal__animate: false,
  success: "Yes",
  failure: "No",
  control: true,
  click(e) {
    if (this.$(e.target).hasClass('overlay')) {
      this.sendAction('closeModal');
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
