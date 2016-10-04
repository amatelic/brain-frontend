import Ember from 'ember';
import App from '../../app';

export default Ember.Route.extend({
  model() {
    let stages = Ember.copy(App.storeMeta['user'].stages);
    let len = Object.values(stages).reduce((a, b) => a + b, 0);
    for (var stag in stages) {
      if (stages.hasOwnProperty(stag)) {
        stages[stag] = [parseInt(stages[stag]), len];
      }
    }
    return Ember.RSVP.hash({
      tasks: this.store.peekAll('task'),
      stages,
    });
  },
  afterModel(model) {
    if (!model.tasks.get('length')) {
      this.transitionTo('home');
    }
  },
  setupController(controller, model) {
    let options = model.tasks.toArray().map(d => d.get('name'));
    controller.set('options', options);
    controller.set('model', model);
  },
  actions: {
    getMonth(d) {
      this.get('store').query('task', {
        filter: {
          month: d
        }
      }).then(function(d) {
        if (!Ember.isEmpty(d.toArray())) {
          this.controllerFor('graph').set('model', d);
        } else {
          alert('We dont\' have and more data');
        }

      }.bind(this));
    }
  }
});
