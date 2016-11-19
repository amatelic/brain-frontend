import Ember from 'ember';
import d3 from 'd3';
export default Ember.Mixin.create({
  width: 300,
  height: 300,
  radius: Ember.computed('width', 'height', function() {
    return Math.min(this.get('width'), this.get('height')) / 2;
  }),

  svg: null,
  initializer: function() {
    this._super(...arguments);
  },

  didInsertElement() {
    this.svg = d3.select(`#chart-${this.get('title')}`);
    this.g = this.svg.attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('class', 'layout');
  },

  colorScale(obj = {}) {
    let range =  obj.range || [0, 3];
    let domain = obj.domain || [d3.rgb('#BE90D4'), d3.rgb('#81CFE0')];
    return d3.scaleLinear().domain(range).interpolate(d3.interpolateHcl)
           .range(domain);

  },

  createScale(obj = {}) {
    let range =  obj.range || [0, 10];
    let domain = obj.domain || [0, this.width];
    return d3.scaleLinear().domain(domain).range(range);
  },

  textDefault(selected) {
    selected.attr("dy", "0.3em")
          .attr("fill", "white")
          .attr("text-anchor", "middle")
          .attr('font-size', "3em");
  },

  svgCor(x = 0, y = 0) {
    return (selector) => {
      selector
        .attr('x', x)
        .attr('y', y);
    };
  },

  svgRect(width = 0, height = 0) {
    return (selector) => {
      selector
      .attr('width', width)
      .attr('height', height);
    };
  },

  animate({delay = 0, duration = 0} = {}) {
    return (selector) => {
      selector
        .duration(duration)
        .delay(delay);
    };
  }
});
