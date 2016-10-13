import Ember from 'ember';
import svgMixin from '../../../mixins/svg';
import d3 from 'd3';
export default Ember.Component.extend(svgMixin, {
  classNames: ['brain__bar ', 'brain__design'],
  width: 500,
  height: 300,
  didInsertElement() {
    this._super(...arguments);
    let tasks = this.get('data').toArray();
    this.svg.attr('transform', 'translate(' + 0 + ',' + (-this.height / 2) + ')');
    let rect =  this.svg.selectAll('rect');
    tasks.forEach((d, i) => {
      let margin = i * 70;
      let data = d.get('days').filter(d => d.complited);
      rect.data(data).enter().call(this.rect(this.width, margin));
      this.text(d.get('name'), margin);
    });
  },

  rect(w, x) {
    var scale = this.colorScale({
      range: [0, 30],
      domain: [d3.rgb('#BE90D4'), d3.rgb('#81CFE0')]
    });
    var scaleHeigth = d3.scaleLinear().domain([0, 30]).range([400, 150]);

    return (select) => {
      select
          .append('rect')
          .call(this.svgCor(50 + x, w))
          .call(this.svgRect(30, 0))
          .attr('fill', (d, i) => scale(i))
          .transition()
          .call(this.animate({duration: 1000, delay: (d,i) => i * 10}))
          .attr('height', 4)
          .attr('y', (d, i) => scaleHeigth(i) - 50);
    };
  },
  text(name, i) {
    let g = this.svg.selectAll('text-' +  i)
      .data([name])
      .enter()
      .append("g")
      .attr("transform", "translate(" + (50 + i) + "," + (this.height + this.height) + ")");


      g.append("text")
        .call(this.svgCor())
        .attr("fill", "white")
        .attr("text-anchor", "start")
        .attr("transform", "rotate(50)")
        .attr('font-size', "0.7em")
        .text(name);

      g.transition()
        .delay(500)
        .attr("transform", "translate(" + (50 + i) + "," + (this.height + 75) + ")");
  }
});
