import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.peekAll('task');
  },
  setupController(controller, model) {
    let options = model.toArray().map(d => d.get('name'));
    controller.set('options', options);
    controller.set('model', model);
  }
});
