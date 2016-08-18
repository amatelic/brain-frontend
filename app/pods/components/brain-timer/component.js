import Ember from 'ember';
import TimeFormater from '../../../utility/timeformatter';
export default Ember.Component.extend({
  classNames: ['brain__timer'],
  setTime: null,
  startTimeStamp: 0,
  duration: null,
  autoStart: false,
  startTime: 0,
  stopRequired: true,
  isStopWatch: false,
  taskIndex: 0,
  isRunning: false,
  didInsertElement: function(){
    if(this.get("autoStart")){
      this.send("start");
    }
  },

  showStartBtn: function(){
    return this.get("isStopWatch") || !this.get("autoStart");
  }.property('autoStart', 'isStopWatch'),

  run: function(time){
    var startTimeStamp = this.get("startTimeStamp");
    this.set('timerId', Ember.run.later(this, function() {
      var timeElapsed = Date.now() - startTimeStamp;
      var secs = timeElapsed / 1000;
      this.set("duration", TimeFormater.getTimefromSecs(secs, 'HH:MM:SS'));
      if (parseInt(secs) === time) {
        var timerId = this.get("timerId");
        Ember.run.cancel(timerId);
        this.sendAction('modal', this.get('taskIndex'));
      } else {
        this.run(time);

      }
    }.bind(this), 25));
  },

  actions: {
    start: function(){
      let time = TimeFormater.convertString(this.get('setTime'));
      var startTime = this.get("startTime") * 1000;
      this.set("startTimeStamp", Date.now() - startTime);
      this.toggleProperty("isRunning");
      this.run(time);
    },

    stop: function(reset){
      var timerId = this.get("timerId");
      var duration = this.get("duration");
      Ember.run.cancel(timerId);
      this.sendAction("updateRecordedTime", duration);
      this.set("isRunning", false);
      if(reset) {
        this.set("startTime", 0);
      }
    },

    pause: function(){
      var duration = this.get("duration");
      var isRunning = this.get("isRunning");
      if(isRunning) {
        this.set("startTime", Formatter.getSecs(duration));
        this.sendAction("updatePausedTime", duration);
        this.send("stop");
      } else {
        this.send("start");
      }
    },

    selectTask(index) {
      this.set('taskIndex', index);
    }
  },

  willDestroyElement: function() {
    var timerId = this.get("timerId");
    Ember.run.cancel(timerId);
  }
});
