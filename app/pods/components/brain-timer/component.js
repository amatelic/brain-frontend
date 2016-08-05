import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['brain__timer'],
  startTimeStamp: 0,
  duration: 0,
  autoStart: false,
  startTime: 0,
  stopRequired: true,
  isStopWatch: false,
  //TODO: check the usage of this variable
  isRunning: false,

  didInsertElement: function(){
    if(this.get("autoStart")){
      this.send("start");
    }
  },

  showStartBtn: function(){
    return this.get("isStopWatch") || !this.get("autoStart");
  }.property('autoStart', 'isStopWatch'),

  run: function(){
    var self = this;
    var startTimeStamp = this.get("startTimeStamp");
    this.set('timerId', Ember.run.later(this, function() {
      var timeElapsed = Date.now() - startTimeStamp;
      var secs = timeElapsed / 1000;
      self.set("duration", parseInt(secs));
      // self.set("duration", Formatter.getTimefromSecs(secs, "HH:MM:SS"));
      self.run();
    }, 25));
  },

  actions: {
    start: function(){
      var startTime = this.get("startTime") * 1000;
      this.set("startTimeStamp", Date.now() - startTime);
      this.set("isRunning", true);
      this.run();
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

    selectTask(e) {
      console.log(e);
    }
  },

  willDestroyElement: function() {
    var timerId = this.get("timerId");
    Ember.run.cancel(timerId);
  }
});
