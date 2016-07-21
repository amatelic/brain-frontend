import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      user: {
        username: 'anze matelic',
        image: 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg'
      }
    }
  }
});
