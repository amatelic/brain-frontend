import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.peekAll('task');
  },
  afterModel(task) {
    if (!task.get('length')) {
      this.transitionTo('home');
    }
  },
  setupController(controller, model) {
    let options = model.toArray().map(d => d.get('name'));
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
