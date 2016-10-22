import Ember from 'ember';
import d3 from 'd3';
import svgMixin from './svg';

export default Ember.Mixin.create(svgMixin, {
  radius: Ember.computed('width', 'height', function() {
    return Math.min(this.get('width'), this.get('height')) / 2;
  }),

  arc(inner, outer) {
    inner = inner || 80;
    outer = outer || this.get('radius');
    return d3.arc()
      .innerRadius(inner)
      .outerRadius(outer);
  },

});
