import Ember from 'ember';
import svgMixin from '../../../mixins/svg';
import d3 from 'd3';
import moment from 'moment';
let {set, get} = Ember;
export default Ember.Component.extend(svgMixin, {
  classNames: ['brain__card__small'],
  emotion: {
    happy: [{ "x": 15,  "y": 20},{ "x": 40,  "y": 60},{ "x": 90, "y": 5}],
    bad: [{"x": 15,  "y": 60},{ "x": 40,  "y": 30},{ "x": 90, "y": 60}],
    neutral: [{"x": 15,  "y": 30},{ "x": 40,  "y": 30},{ "x": 90, "y": 30}],
  },
  text: {
    happy: 'Nice job',
    bad: 'Hey start working',
    neutral: 'Good boy',
  },
  changeEmotion: Ember.computed('tasks', 'messages', function() {
      Ember.run.schedule("afterRender",this,function() {
        let per = this.calculateEmotion();
        this.drawMount(this.get(`emotion.${this.selectEmotion(per)}`), 1000);
      });
  }),
  messages: Ember.computed('tasks', 'messages', function() {
    let per = this.calculateEmotion();
    return this.get(`text.${this.selectEmotion(per)}`);
  }),
  init() {
    this._super(...arguments);
    let number = this.width;
    this.radisu = number / 100;
    this.heightDeveide = number / 2;
    this.widthScale = this.createScale({domain: [0, 100], range: [0, this.width]});
    this.heightScale = this.createScale({domain: [0, 100], range: [0, this.height - this.heightDeveide]})
    this.lineFunction = d3.line()
                      .x(d => this.widthScale(d.x))
                      .y(d => this.heightDeveide + this.heightScale(d.y))
                      .curve(d3.curveCatmullRom.alpha(0.1));

  },

  didInsertElement() {
    this._super(...arguments);
    this.draw();
  },

  calculateEmotion() {
    //day has to be zero based because of the data base;
    let day = moment().date();
    let tasks = this.get('tasks').toArray();
    let complited = tasks.filter(d => d.get('days')[day-1].complited > 0);
    let tracking = tasks.filter(d => d.get('days')[day-1].tracking);
    return (complited.length * 100) / tracking.length;
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

  selectEmotion(value) {
    if (value >= 75) {
      return 'happy';
    }else if(value > 40) {
      return 'neutral';
    } else {
      return 'bad';
    }
  },

  drawMount(data, duration = 0) {
    this.svg.select('path')
    .transition()
    .duration(duration)
    .attr('d', this.lineFunction(data))
    .call(this.mouthDesign);
  },

  draw() {
    this.svg.append('path');
    let emotion = this.get('state');
    this.drawMount(this.get(`emotion.${emotion}`));
    this.svg.append("circle").call(this.eyes(25, 50, (this.radisu * 7), "#7b3e68"))
    this.svg.append("circle").call(this.eyes(75, 50, (this.radisu * 7), "#7b3e68"));
  },

  willDestroy() {
    this._super(...arguments);
    this.set('svg', null);
    Ember.run.cancel(this.check);
  }
});
