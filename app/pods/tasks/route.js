import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      tasks: [
        {
          name: 'Meditate 10 minuts',
          description: 'bla bla',
          complited: true,
        },
        {
          name: 'Reading a book a day',
          description: 'To get more knowladge',
          complited: false,
        },
        {
          name: 'Do 100 suburies',
          description: 'For fun :)',
          complited: false,
        },
      ]
    }
  }
});
