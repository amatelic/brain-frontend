import Ember from 'ember';
import moment from 'moment';
/**
 * Mixin for muti icon functionality basic emotion and connection to web socket
 */

export default Ember.Mixin.create({

  emotion: {
    happy: [{ "x": 15,  "y": 20},{ "x": 40,  "y": 60},{ "x": 90, "y": 5}],
    bad: [{"x": 15,  "y": 60},{ "x": 40,  "y": 30},{ "x": 90, "y": 60}],
    neutral: [{"x": 15,  "y": 30},{ "x": 40,  "y": 30},{ "x": 90, "y": 30}],
  },

  text: {
    happy: ['Good job', 'Excellent!!!', 'Well done', 'You da man'],
    bad: ['Come on!', 'Start working!', 'Better start working', 'Stop wining and start working'],
    neutral: ['You could do better', '...', 'mhmm', 'Not bad but you can do better']
  },

  init() {
    this._super(...arguments);
    // Socket io notifications connection
    this.id = this.get('session.data.authenticated.user_id');
    const socket = this.get('websockets').socketFor('ws://localhost:7000/');
    socket.on('connect', () => socket.emit('id', this.id));
    socket.on('hello', (res) => this.set('response', res), this);
    socket.on('message', (res) => {
      console.log(res)
      this.set('response', res)
    }, this);
    this.set('socketRef', socket);
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

  calculateEmotion() {
    //day has to be zero based because of the data base;
    let day = moment().date();
    let tasks = this.get('tasks').toArray();
    let complited = tasks.filter(d => d.get('days')[day-1].complited > 0);
    let tracking = tasks.filter(d => d.get('days')[day-1].tracking);
    return (complited.length * 100) / tracking.length;
  },

});
