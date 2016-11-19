import Ember from 'ember';
import moment from 'moment';
const times = ['0.00','1.00', '2.00', '3.00', '4.00', '5.00', '6.00', '7.00', '8.00', '9.00',
'10.00','11.00', '12.00', '13.00', '14.00', '15.00', '16.00', '17.00', '18.00', '19.00', '20.00',
'21.00', '22.00', '23.00'];
const days = ['Today'];

export default Ember.Component.extend({
  classNames: ['full-size'],
  times, days,
  showTasks: Ember.computed('tasks', function() {
    let today = moment().date() - 1;
    return this.get('tasks').map((task, index) => {
      let time = moment(task.get('days')[today]['complited-at'], 'HH:mm:ss');
      console.log(time, time.hour())
      return {
        x: index * 70 + 420,
        y: time.hour() * 70,
        name: task.get('name'),
        data: task.get('days')[today]
      };
    });
  }),
});
