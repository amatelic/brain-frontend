import Ember from 'ember';
import d3 from 'd3';
import svgMixin from '../../../mixins/svg';
export default Ember.Component.extend(svgMixin, {
  width: 200,
  height: 200,
  classNames: ['brain__card__pie', 'brain__design'],
  didInsertElement() {
    this._super(...arguments);
    let total = this.get('data');
    let complited = (total[0] * 100) / total[1];
    let dataset = [complited, 100 - complited];
    let color = this.colorScale();

    var arc = this.arc(80, this.get('radius') - 10);
    var arcLarge = this.arc();
    var pie = d3.pie().sort(null);
    let svg = this.svg.attr('transform', 'translate(' + (this.width / 2) +
      ',' + (this.height / 2) + ')');
    var g = svg.selectAll('path')
      .data(pie(dataset))
      .enter().append("g");

      g.append('path')
        .attr('d', arc)
        .attr('fill', (d, i) => color(i))
        .on('mouseover', d => svg.select('path').transition().duration(500).attr('d', arcLarge))
        .on('mouseout', d => svg.select('path').transition().duration(500).attr('d', arc));

    var g = this.svg.selectAll('text')
      .data([complited])
      .enter().append("g")
      .append("text")
        .call(this.textDefault)
        .text(`${0} %`)
        .transition()
        .duration(2000)
        .tween("text", function(d) {
          let number = this.textContent.slice('%')[0];
            var i = d3.interpolate(number, d);
            return function(t) {
                this.textContent =  Math.round(i(t)) + ' %';
            }.bind(this);
        });
  }
});