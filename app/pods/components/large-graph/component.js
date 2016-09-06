import Ember from 'ember';
import Graph from 'brain/graph/graph';
import moment from 'moment';
import Statistics from '../../../utility/statistics';
export default Ember.Component.extend({
  statistics: Statistics,
  graph: new Graph(),
  month: (moment().month() + 1),
  normal: null,
  options: null,
  task: null,
  monthPosition: null,
  showStats: Ember.computed('normal', function() {
    let  data = this.get('normal.datasets')[0].data;
    let worked = this.get('statistics').differenc(data);
    return `${worked} / ${data.length}`;
  }),
  showWholeStat: Ember.computed('tasks', function() {
    let one = 0, full = 0;
    this.get('data').toArray().forEach(d => {
      let data = this.get('statistics').differenc(d.get('monthly'));
      one += data;
      full += d.get('monthly').length;
    });
    return `${this.get('statistics').procentage(one, full)}/100%`;
  }),

  didReceiveAttrs() {
    this._super(...arguments);
    const task = this.get('data').objectAt(0);
    this.set('task', task);
    this.set('options', this.get('graph').option());
    this.set('normal', this.get('graph').getData(task));
  },
  actions: {

    /**
     * Method for selecting tasks data
     * @param {Number} index expected tasks index
     */

    selectGraph(index) {
        const task = this.get('data').objectAt(index);
        this.set('task', task);
        this.set('normal', this.get('graph').getData(task));
    },

    /**
     * Method for changing monthly tasks
     * @param {String} type expected [right, left]
     */

    getMonth(type) {
      var num = (type === 'left') ? -1 : 1;
      this.set('month', this.get('month') + num);
      this.sendAction('getMonth', this.get('month'));
    }
  }
});
