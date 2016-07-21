import Ember from 'ember';
//https://github.com/chartjs/Chart.js/tree/v1.1.1/docs
export default Ember.Route.extend({
  afterModel() {
    this.transitionTo('home');
  },

  model() {
    return {
      user: {
        username: 'anze matelic',
        image: 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg'
      },
      quote: {
        content: 'I am as bad as the worst, but, thank God, I am as good as the best.',
        author: 'Walt Whitman'
      },
    };
  }
});
