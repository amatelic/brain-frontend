import Ember from 'ember';
import d3 from 'd3';
import svgMixin from '../../../mixins/svg';
export default Ember.Component.extend(svgMixin, {
  classNames: ['brain__card__small'],
  didInsertElement() {
    this._super(...arguments);
    let complited = Math.round(Math.random() * 100) ;

    let dataset = [complited, 100 - complited];
    let color = this.colorScale();

    var arc = this.arc(80, this.get('radius') - 10);
    var arcLarge = this.arc();
    var pie = d3.pie().sort(null)


    var g = this.svg.selectAll('path')
      .data(pie(dataset))
      .enter().append("g")

      g.append('path')
        .attr('d', arc)
        .attr('fill', (d, i) => color(i))
        .on('mouseover', d => this.svg.select('path').transition().duration(500).attr('d', arcLarge))
        .on('mouseout', d => this.svg.select('path').transition().duration(500).attr('d', arc))
        // .transition()
        // .duration(500)
        // .tween("path", function(d) {
        //   console.log(d, this)
        // });

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
