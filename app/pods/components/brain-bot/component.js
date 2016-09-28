import Ember from 'ember';
import d3 from 'd3';

export default Ember.Component.extend({
  classNames: ['brain__card'],
  emotion: {
    happy: [{ "x": 15,  "y": 20},{ "x": 40,  "y": 60},{ "x": 90, "y": 5}],
    bad: [{"x": 15,  "y": 60},{ "x": 40,  "y": 30},{ "x": 90, "y": 60}],
    neutral: [{"x": 15,  "y": 30},{ "x": 40,  "y": 30},{ "x": 90, "y": 30}],
  },
  changeEmotion: Ember.computed('state', function() {
      let emotion = this.get('state');
      this.svg.select('path')
              .transition()
              .duration(1000)
              .attr('d', this.lineFunction(this.get(`emotion.${emotion}`)))
              .call(this.mouthDesign)
  }),
  init() {
    this._super(...arguments);
    let number = 200;
    this.width = number;
    this.height = number;
    this.radisu = number / 100;
    this.heightDeveide = number / 2;

    this.widthScale = d3.scaleLinear().domain([0, 100]).range([0, this.width]);
    this.heightScale = d3.scaleLinear().domain([0, 100]).range([0, this.height - this.heightDeveide]);
    this.lineFunction = d3.line().x(d => this.widthScale(d.x)).y(d => this.heightDeveide + this.heightScale(d.y))
                     .curve(d3.curveCatmullRom.alpha(0.1));

    this.svg = d3.select('.graphs')
               .attr('width', this.width)
               .attr('height', this.height);
  },
  didInsertElement() {
    this._super(...arguments);
    this.draw();
  },
  mouthDesign(selection) {
    selection.attr('stroke', '#7b3e68')
        .attr('stroke-width', 3)
        .attr('fill', 'none');
  },
  eyes(x, y, r, color) {
    return (selection) => {
      selection.attr("cx", this.widthScale(x))
              .attr("cy", this.heightScale(y))
              .attr("r", r)
              .attr("fill", color);
    };
  },
  draw() {
    this.svg = d3.select('.graphs')
                .attr('width', this.width)
                .attr('height', this.height);

    let select = ['happy', 'bad', 'neutral'][Math.round(Math.random() * 2)];
    var lineGraph = this.svg.append('path')
                 .attr('d', this.lineFunction(this.emotion[select]))
                 .call(this.mouthDesign);


    this.check = Ember.run.later(this, () => {
      let select = ['happy', 'bad', 'neutral'][Math.round(Math.random() * 2)];
      this.set('state', select);
    }, 2000);

    this.svg.append("circle").call(this.eyes(25, 50, (this.radisu * 7), "#7b3e68"))
    this.svg.append("circle").call(this.eyes(75, 50, (this.radisu * 7), "#7b3e68"));
  },

  willDestroy() {
    this._super(...arguments);
    this.set('svg', null);
    Ember.run.cancel(this.check);
  }
});
