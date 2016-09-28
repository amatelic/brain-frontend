import Ember from 'ember';
import svgMixin from '../../../mixins/svg';
import d3 from 'd3';
export default Ember.Component.extend(svgMixin, {
  classNames: ['brain__card'],
  width: 500,
  height: 300,
  didInsertElement() {
    this._super(...arguments);
    let tasks = this.get('data').toArray();
    this.svg.attr('transform', 'translate(' + 0 + ',' + (-this.height / 2) + ')');
    let rect =  this.svg.selectAll('rect')
    tasks.forEach((d, i) => {
      let data = d.get('days').filter(d => d.complited);
      rect.data(data).enter().call(this.rect(this.width, i * 70))
    });
  },

  rect(w, x) {
    var scale = this.colorScale({
      range: [0, 30],
      domain: [d3.rgb('#BE90D4'), d3.rgb('#81CFE0')]
    });
    var scaleHeigth = d3.scaleLinear().domain([0, 30]).range([450, 150])

    return (select) => {
      select
          .append('rect')
          .attr('x', 50 + x)
          .attr('y', w)
          .attr('width', 30)
          .attr('height', 0)
          .attr('fill', (d, i) => scale(i))
          .transition()
          .duration(1000)
          .delay((d,i) => i * 10)
          .attr('height', 4)
          .attr('y', (d, i) => { console.log(scaleHeigth(i)); return scaleHeigth(i)  })
    }
  },
});
