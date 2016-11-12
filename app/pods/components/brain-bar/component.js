import Ember from 'ember';
import svgMixin from '../../../mixins/svg';
import zoomMixin from '../../../mixins/zoom';
import d3 from 'd3';
export default Ember.Component.extend(svgMixin, zoomMixin, {
  classNames: ['brain__bar ', 'brain__design'],
  width: 700,
  height: 300,

  didInsertElement() {
    this._super(...arguments);

    this.zoom = this.onZoom();
    this.svg.call(this.zoom);


    let rect =  this.g.selectAll('rect');
    let tasks = this.get('data').toArray();

    tasks.forEach((d, i) => {
      let margin = i * 70;
      let data = d.get('days').filter(d => d.complited);

      rect.data(data)
          .enter()
          .call(this.rect(this.width, margin));

      this.text(d.get('name'), margin);
    });
  },

  rect(w, x) {
    var scale = this.colorScale({
      range: [0, 30],
      domain: [d3.rgb('#BE90D4'), d3.rgb('#81CFE0')]
    });

    var scaleHeigth = d3.scaleLinear().domain([1, 31]).range([this.get('height') - 100, 0]);

    return (select) => {
      select
          .append('rect')
          .call(this.svgCor(50 + x, w))
          .call(this.svgRect(50, 0))
          .attr('fill', (d, i) => scale(i))
          .transition()
          .call(this.animate({duration: 1000, delay: (d,i) => i * 10}))
          .attr('height', (this.get('height') - 100) / 55)
          .attr('y', (d, i) => scaleHeigth(i));
    };
  },

  text(name, i) {
    let g = this.g.selectAll('text-' +  i)
      .data([name])
      .enter()
      .append("g")
      .attr("transform", "translate(" + (50 + i) + "," + (this.get('height') + 10) + ")");


      g.append("text")
        .call(this.svgCor())
        .attr("fill", "white")
        .attr("text-anchor", "start")
        .attr("transform", "rotate(50)")
        .attr('font-size', "0.7em")
        .text(name);

      g.transition()
        .delay(500)
        .attr("transform", "translate(" + (50 + i) + "," + (this.get('height') - 70) + ")");
  },

  actions: {
    resetScale() {
      this.showScale();
    }
  }
});
