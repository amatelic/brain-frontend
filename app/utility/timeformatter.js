import Ember from 'ember';
import jaro from 'npm:jaro-winkler';
export default Ember.Object.create({
  getTimefromSecs: function(seconds, format){
    if(format === "seconds"){
      return seconds;
    }
    var h = Math.floor(seconds / 3600);
    seconds = seconds % 3600;
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    h = this.addZero(h);
    m = this.addZero(m);
    s = this.addZero(s);
    if(format === "HH:MM"){
      return h + ":" + m;
    } else if(format === "HH:MM:SS") {
      return h + ":" + m + ":" + s;
    }
  },

  addZero(time) {
    return time < 10 ? "0" + time : time;
  },

  getSecs: function(time){
    var arr = time.split(':');
    var h = arr[0] || 0;
    var m = arr[1] || 0;
    var s = arr[2] || 0;
    return (parseFloat(h) * 3600 + parseFloat(m) * 60 + parseFloat(s));
  },
  convertString(str) {
    let [number, time] = str.split(' ');
    number = parseFloat(number);
    if (!Number.isInteger(number)) {
      alert('Not a number');
    }
    if (!time) {
      return;
    }
    if (jaro(time, 'hour') > 0.9) {
      return number * 3600;
    }

    if (jaro(time, 'minuts') > 0.9) {
      return number * 60;
    }
    if (jaro(time, 'seconds') > 0.9) {
      return number;
    }

  }
});
