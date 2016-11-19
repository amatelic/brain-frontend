import Ember from 'ember';
import svgMixin from 'brain/mixins/svg';
import d3 from 'd3';
export default Ember.Component.extend(svgMixin, {
  classNames: ['brain__design'],
  width: 700,
  height: 300,
  didInsertElement() {
    this._super(...arguments);

    var color = d3.scaleLinear().domain([1, 8])
      .interpolate(d3.interpolateHcl)
      .range([d3.rgb('#96497e'), d3.rgb("#be90d4")]);

    var pack = d3.pack()
                  .size([this.get('width'), this.get('height')])
                  .padding(1.5);

    let data = this.formatData(this.get('data').toArray());
    let root = d3.hierarchy(data)
        .sum(d => d.size)
        .sort((a, b) => b.value - a.value);

    var nodes = pack(root).descendants();

    let node = this.createCircleG(nodes);
    this.createCircles(node, color);
    this.createText(node);


  },

  formatData(data) {
    let dates = data.reduce((prev, next) => {
      let data = next.get('days').reduce(this.getComlitedValues, []);
      prev = prev.concat(data);
      return prev;
    }, []);

    let tt = dates.reduce((prev, next) => {
      let date = next.split(':');
      if (!prev[date[0]]) {
        prev[date[0]] = { name: `${[date[0]]}:00`, size: 0 };
      }

      prev[date[0]].size++;
      return prev;
    }, {});

    return  { children: Object.values(tt) };
  },

  getComlitedValues(prev, next) {
    if(next['complited-at']) {
      let dates = next['complited-at'];
      prev.push(dates);
    }
    return prev;
  },

  createCircleG(nodes) {
   return this.g.selectAll('circle').data(nodes).enter().append("g")
   .attr("class", d => d.parent ? d.children ? "node" : "node node--leaf" : "node node--root")
   .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
 },

  createCircles(node, color) {
    node.append('circle')
      .transition()
      .duration(500)
       .style("fill", d => (!d.parent) ? '#89b3ee' : color(d.value))
      .attr("r", d => d.r);
  },


  createText(node) {
    node.append('text')
      .attr("transform", d => "translate(" + 0 + "," + (d.r / 5 ) + ")")
      .text(d => d.data.name)
      .attr('opacity', 0)
      .attr('class', 'time-circle')
      .style('font-size', d => d.r / 2)
      .style('text-anchor', 'middle')
      .transition()
      .delay(500)
      .duration(500)
      .attr('opacity', 1);
  }
});
