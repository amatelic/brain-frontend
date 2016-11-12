//http://bl.ocks.org/stepheneb/1182434
import Ember from 'ember';
import d3 from 'd3';
export default Ember.Mixin.create({
  onZoom(scale = [1, 2]) {
    // d3.select('.layout')
    //     .on('mousedown', function() {
    //       console.log(this)
    //       this.preventDefault();
    //       d3.select('body').style("cursor", "move");
    //     })
    //     .on('mouseup', function() {
    //       console.log(this)
    //       this.preventDefault();
    //       d3.select('body').style("cursor", "auto");
    //     });

    return d3.zoom()
            .scaleExtent(scale)
            .on("zoom", this.zoomed.bind(this));
  },

  zoomed() {
    let t = d3.zoomTransform(this);
    // d3.select(this).attr("transform", t);
    this.g.attr("transform", d3.event.transform)
  },

  showScale() {
      this.svg.transition()
      .duration(750).call(this.get('zoom').transform, d3.zoomIdentity);
  }

});
