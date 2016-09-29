import Ember from 'ember';
import Graph from 'brain/graph/graph';
//http://balinterdi.com/2015/08/29/how-to-do-a-select-dropdown-in-ember-20.html

export default Ember.Component.extend({
  graph: new Graph(),
  classNames: ['brain__card__small'],
  selectedGraph: 'isRadar',
  isRadar: true,
  isBar: false,
  isPie: false,
  types: ['Radar', 'Bar', 'Pie'],
  didReceiveAttrs() {
    this._super(...arguments);
    const tasks = this.get('data');
    this.set('data', this.get('graph').createData(tasks));
  },
  actions: {
    selectGraph(type) {
      let prevGraph = this.get('selectedGraph');
      this.set(prevGraph, false);
      this.set(type, true);
      this.set('selectedGraph', type);
    },
  }
});
