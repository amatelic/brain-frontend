import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['message__app'],
  isNew: Ember.computed('messages.@each.status', function() {
    let messages = this.get('messages');
    return messages.filterBy('status', true).length;
  }),
  texst: [],
  actions: {
    sendMessage(e) {
      if (e.which === 13) {
        this.get('texst').addObject({user: 'anze', message: e.target.value});
        e.target.value = '';
      }
    },
    showMessage(message) {
      message.set('status', false);
      this.set('text', message.get('text'));
    }
  }
});
