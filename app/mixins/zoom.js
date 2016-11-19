//http://bl.ocks.org/stepheneb/1182434
import Ember from 'ember';
import d3 from 'd3';
export default Ember.Mixin.create({
  onZoom(scale = [1, 2]) {
    return d3.zoom()
            .scaleExtent(scale)
            .on("zoom", this.zoomed.bind(this));
  },

  zoomed() {
    this.g.attr("transform", d3.event.transform);
  },

  showScale() {
      this.svg.transition()
      .duration(750).call(this.get('zoom').transform, d3.zoomIdentity);
  }

});
