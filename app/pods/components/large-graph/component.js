import Ember from 'ember';
import Graph from 'brain/graph/graph';

export default Ember.Component.extend({
  graph: new Graph(),
  normal: null,
  options: null,
  task: null,
  monthPosition: null,
  didReceiveAttrs() {
    this._super(...arguments);
    const tasks = this.get('data');
    const task = tasks.objectAt(0);
    this.set('task', task);
    this.set('options', this.get('graph').option());
    this.set('normal', this.get('graph').getData(task));
  },
  actions: {
    selectGraph(index) {
        const task = this.get('data').objectAt(index);
        this.set('task', task);
        this.set('normal', this.get('graph').getData(task));
    },
    getMonth(e) {
      console.log(e, this.get('task').get('name'));
    }
  }
});
