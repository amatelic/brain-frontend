import Ember from 'ember';
import Graph from 'brain/graph/graph';

export default Ember.Component.extend({
  graph: new Graph(),
  normal: null,
  options: null,
  task: null,
  monthPosition: null,
  showStats: Ember.computed('normal', function() {
    let  data = this.get('normal.datasets')[0].data;
    let worked = data.reduce((a,b) => (a += (b > 0) ? 1 : 0), 0);
    return `${worked} / ${data.length}`;
  }),
  showWholeStat: Ember.computed('property', function() {
    let one = 0;
    let full = 0;
    this.get('data').toArray().forEach(d => {
      let data = d.get('monthly').reduce((a,b) => (a += (b > 0) ? 1 : 0), 0);
      one += data;
      full += d.get('monthly').length;
    })
    return `${this.procentage(one, full)}/100%`;
  }),
  procentage(first, second) {
    return Math.round((first * 100) / second);
  },
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
