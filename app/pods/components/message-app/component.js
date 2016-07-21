import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['message__app'],
  texst: [],
  messages: [
    {
      title: 'This is a test',
      image: 'http://sourcefed.com/wp-content/uploads/2012/10/twitter-for-ios-app-thumbnail.jpg'
    },
    {
      title: 'This is a test1',
      image: 'http://sourcefed.com/wp-content/uploads/2012/10/twitter-for-ios-app-thumbnail.jpg'
    },
  ],
  actions: {
    sendMessage(e) {
      if (e.which === 13) {
        this.get('texst').addObject({user: 'anze', message: e.target.value});
        e.target.value = '';
      }
    }
  }
});
