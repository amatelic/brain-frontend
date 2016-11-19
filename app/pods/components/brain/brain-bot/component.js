import Ember from 'ember';
import svgCircleMixin from 'brain/mixins/circle';
import mutiMixin from 'brain/mixins/muti';
import d3 from 'd3';

export default Ember.Component.extend(svgCircleMixin, mutiMixin, {
  websockets: Ember.inject.service('socket-io'),
  session: Ember.inject.service('session'),
  classNames: ['brain_bot'],
  classNameBindings: ['startChatting'],
  startChatting: false,
  messages: [],
  width: 100,
  height: 100,

  changeEmotion: Ember.computed('tasks', function() {
      Ember.run.schedule("afterRender",this,function() {
        let per = this.calculateEmotion();
        this.drawMount(this.get(`emotion.${this.selectEmotion(per)}`), 1000);
      });
  }),

  updatedMessage: Ember.computed('messages.[]', function() {
    Ember.run.debounce(this, function() {
      this.slideNewText();
    }, 100);
  }),

  init() {
    this._super(...arguments);
    let number = this.width;
    this.radisu = number / 100;
    this.heightDeveide = number / 2;
    this.widthScale = this.createScale({domain: [0, 100], range: [0, this.width]});
    this.heightScale = this.createScale({domain: [0, 100], range: [0, this.height - this.heightDeveide]});
    this.lineFunction = d3.line()
                      .x(d => this.widthScale(d.x))
                      .y(d => this.heightDeveide + this.heightScale(d.y))
                      .curve(d3.curveCatmullRom.alpha(0.1));
  },

  didInsertElement() {
    this._super(...arguments);
    this.draw();
  },

  mouthDesign(selection) {
    selection
        .attr('stroke-width', 3)
        .attr('fill', 'none');
  },

  eyes(x, y, r, className) {
    return (selection) => {
      selection.attr("cx", this.widthScale(x))
              .attr("cy", this.heightScale(y))
              .attr('class', className)
              .attr("r", r);
    };
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
    this.svg.append("circle").call(this.eyes(25, 50, (this.radisu * 7), "eyes"));
    this.svg.append("circle").call(this.eyes(75, 50, (this.radisu * 7), "eyes"));
  },

  willDestroy() {
    this._super(...arguments);
    this.set('svg', null);
    Ember.run.cancel(this.check);
  },

  slideNewText() {
    let chatMessages = this.$('.panel__body');
    if (chatMessages) {
      chatMessages.scrollTop(chatMessages[0].scrollHeight);
    }
  },

  actions: {
    sendMessage(e) {
      let message = e.target.value;
      let id = this.get('id');
      const socket = this.get('websockets').socketFor('ws://localhost:7000/');
      if (e.which === 13) {
        this.get('messages').pushObject({type: 'me', message});
        socket.emit('message', {message, id});
        e.target.value = "";
      }
    },
    iconClick() {
      this.toggleProperty('startChatting');
      // this.$('input')[0].focus(); //bug
    },
  }
});
