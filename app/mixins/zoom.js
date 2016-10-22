import Ember from 'ember';
import d3 from 'd3';
export default Ember.Mixin.create({
  zoom(scale = [1, 2]) {
    return d3.zoom()
            .scaleExtent(scale)
            .on("zoom", this.zoomed);
  },

  zoomed() {
    let t = d3.zoomTransform(this);
    d3.select(this).attr("transform", t);
  },

  showScale() {
    //To implement
  }

});
