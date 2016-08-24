import Ember from 'ember';

export default Ember.Service.extend({
  init() {
    this._super(...arguments);
    this.set('items', []);
  },


  showArray(data, time) {
    data.toArray().forEach(d => {
        this.show({
              'title': d.get('title'),
              'text': d.get('text'),
              'icon': d.get('image'),
              vibrate: [200, 100, 200],
            }, time)});
  },

  show(option, time = 0) {
    Ember.run.later(this, function() {
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      } else if (Notification.permission === "granted") {
        var notification = new Notification(option.title, option);
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
          if (permission === "granted") {
            var notification = new Notification(option.title, option);
          }
        });
      }
    }, time);
  },
});
