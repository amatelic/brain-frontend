import Ember from 'ember';
//http://balinterdi.com/2015/08/29/how-to-do-a-select-dropdown-in-ember-20.html

export default Ember.Component.extend({
  classNames: ['brain__card'],
  selectedGraph: 'isRadar',
  isRadar: true,
  isBar: false,
  isPie: false,
  types: ['Radar', 'Bar', 'Pie'],
  actions: {
    selectGraph(type) {
      let prevGraph = this.get('selectedGraph');
      this.set(prevGraph, false);
      this.set(type, true);
      this.set('selectedGraph', type);
    },
  }
});
