import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Graph from 'brain/graph/graph';
// let t = new Graph();
// console.log(t.option())
export default Ember.Route.extend(AuthenticatedRouteMixin, {
  graph: new Graph(),
  model() {
    return Ember.RSVP.hash({
      width: 400,
      height: 400,
      user: this.store.peekRecord('user', 1),
      option: this.get('graph').option(),
      graph: this.store.peekRecord('user', 1).get('tasks'),
    });
  },
  actions: {
    checkTask(task) {
      let user = this.store.peekRecord('user', 1);
      task.set('user', user);
      task.save();
    },
    modal() {
      this.controllerFor('application').set('showModal', true);
    }
  }
});
