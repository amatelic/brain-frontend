import Ember from 'ember';
import d3 from 'd3';
import svgCircleMixin from 'brain/mixins/circle';
export default Ember.Component.extend(svgCircleMixin, {
  width: 170,
  height: 170,
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
    let svg = this.g.attr('transform', 'translate(' + (this.width / 2) +
      ',' + (this.height / 2) + ')');

    let g = svg.selectAll('path')
      .data(pie(dataset))
      .enter().append("g");

      g.append('path')
        .attr('d', arc)
        .attr('fill', (d, i) => color(i))
        .on('mouseover', () => svg.select('path').transition().duration(500).attr('d', arcLarge))
        .on('mouseout', () => svg.select('path').transition().duration(500).attr('d', arc));

    this.g.selectAll('text')
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
