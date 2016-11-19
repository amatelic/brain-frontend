import Ember from 'ember';
import Graph from 'brain/graph/graph';
import moment from 'moment';
import Statistics from 'brain/utility/statistics';
import d3 from 'd3';
//http://www.flatuicolorpicker.com/
export default Ember.Component.extend({
  classNames: ['grid'],
  statistics: Statistics,
  graph: new Graph(),
  month: (moment().month() + 1),
  normal: null,
  options: null,
  task: null,
  monthPosition: null,
  showStats: Ember.computed('task', function() {
    let data = this.get('task');
    let tasks = data.get('days').map(d => d.complited);
    let tracking = data.get('days').filter(d => d.tracking);
    let worked = this.get('statistics').differenc(tasks);
    return `${worked} / ${tracking.length}`;
  }),
  showWholeStat: Ember.computed('tasks', function() {
    let one = 0, full = 0;
    this.get('tasks').toArray().forEach(d => {
      let tasks = d.get('days').map(d => d.complited);
      let tracking = d.get('days').filter(d => d.tracking);
      let data = this.get('statistics').differenc(tasks);
      one += data;
      full += tracking.length;
    });
    return `${this.get('statistics').procentage(one, full)}/100%`;
  }),

  didReceiveAttrs() {
    this._super(...arguments);
    const task = this.get('data').objectAt(0);
    this.set('task', task);
    // this.set('options', this.get('graph').option());
    // this.set('normal', this.get('graph').getData(task));
  },

  didInsertElement() {
    let w = 500;
    let tasks = this.get('tasks').toArray();
    let svg = d3.select('.progress');
    let rect =  svg.selectAll('rect');
    tasks.forEach((d, i) => {
      let data = d.get('days').filter(d => d.complited);
      rect.data(data).enter().call(this.rect(w, i * 70));
    });

  },

  rect(w, x) {
    var scale = d3.scaleLinear().domain([0, 30]).interpolate(d3.interpolateHcl)
                    .range([d3.rgb('#BE90D4'), d3.rgb('#81CFE0')]);
    var scaleHeigth = d3.scaleLinear().domain([0, 30]).range([450, 50]);
    return (select) => {
      select
          .append('rect')
          .attr('x', 50 + x)
          .attr('y', w)
          .attr('width', 30)
          .attr('height', 0)
          .attr('fill', (d, i) => scale(i))
          .transition()
          .duration(1000)
          .delay((d,i) => i * 10)
          .attr('height', 10)
          .attr('y', (d, i) => { console.log(scaleHeigth(i)); return scaleHeigth(i);  });
    };
  },

  actions: {

    /**
     * Method for selecting tasks data
     * @param {Number} index expected tasks index
     */

    selectGraph(index) {
        const task = this.get('data').objectAt(index);
        this.set('task', task);
        // this.set('normal', this.get('graph').getData(task));
    },

    /**
     * Method for changing monthly tasks
     * @param {String} type expected [right, left]
     */

    getMonth(type) {
      var num = (type === 'left') ? -1 : 1;
      this.set('month', this.get('month') + num);
      this.sendAction('getMonth', this.get('month'));
    },

  }
});
