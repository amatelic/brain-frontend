import Ember from 'ember';
import moment from 'moment';
export default Ember.Component.extend({
    classNames: ['brain__card'],
    //Fix bug
    areComplited: Ember.computed('tasks.days', function() {
      // console.log(this.get('tasks').toArray());
      // console.log(this.get('tasks'))
      // let tasks= this.get('tasks');
      // let today = moment().date();
      // let complited = tasks.filter(d => {
      //   return d.get('days')[today].complited >= 1;
      // });
      // return `${complited.length}/${tasks.toArray().length}`;

    }),
    actions: {
      toggleTask(task) {
        let today = moment().date() - 1;
        let complited = (task.get(`days.${today}.complited`)) ? 0 : 1;
        console.log(complited)
        task.set(`days.${today}.complited`, complited);
        this.sendAction('checkTask', task);
      }
    }
});
