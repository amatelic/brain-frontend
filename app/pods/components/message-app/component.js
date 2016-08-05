import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['message__app'],
  texst: [],
  actions: {
    sendMessage(e) {
      if (e.which === 13) {
        this.get('texst').addObject({user: 'anze', message: e.target.value});
        e.target.value = '';
      }
    },
    showMessage(message) {
      this.set('text', message.get('text'));
    }
  }
});
