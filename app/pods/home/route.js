import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Graph from 'brain/graph/graph';
// let t = new Graph();
// console.log(t.option())
export default Ember.Route.extend(AuthenticatedRouteMixin, {
  graph: new Graph(),
  model() {
    let user = this.store.peekRecord('user', 1);
    return user.get('tasks').then(d => {
      return  {
        user: user,
        width: 400,
        height: 400,
        graph: this.get('graph').createData(d),
        option: this.get('graph').option()
      };
    });
  },
  actions: {
    checkTask(task) {
      let user = this.store.peekRecord('user', 1);
      task.set('user', user)
      task.save();
    },
  }
});
