import Ember from 'ember';
import moment from 'moment';
export default Ember.Component.extend({
    classNames: ['brain__card'],
    areComplited: Ember.computed('tasks.days', function() {
      let tasks= this.get('tasks');
      let today = moment().date();
      let complited = tasks.filter(d => {
        return d.get('days')[today].complited >= 1;
      });
      return `${complited.length}/${tasks.toArray().length}`;

    }),
    actions: {
      toggleTask(task) {
        let today = moment().date();
        task.set(`days.${today}.complited`, 1);
        this.sendAction('checkTask', task);
      }
    }
});
