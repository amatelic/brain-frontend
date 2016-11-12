import Ember from 'ember';
import moment from 'moment';
let {set, get} = Ember;
import { storageFor } from 'ember-local-storage';
export default Ember.Component.extend({
    tasksUI: storageFor('tasks'),
    classNames: ['brain__card', 'brain__design'],
    selectedType: 'learn',
    taskTypes: [
      { name: 'learn', toggle: true},
      { name: 'social', toggle: false},
      { name: 'creativity', toggle: false},
      { name: 'sport', toggle: false},
      { name: 'health', toggle: false}
    ],
    //Filter tasks by TaskType
    filterByTypes: Ember.computed('tasks', 'selectedType', function() {
      let type = this.get('selectedType');
      return this.get('tasks').filter(item => {
        return item.get('type') === type;
      });
    }),
    //Cheking all complited tasks
    areComplited: Ember.computed('tasks.@each.days', function() {
      let tasks = this.get('tasks');
      let today = moment().date() - 1; //index based
      let complited = tasks.filter(d => {
        return d.get('days')[today].complited >= 1;
      });
      return `${complited.length}/${tasks.toArray().length}`;

    }),
    actions: {

      toggleTask(task) {
        let today = moment().date() - 1;
        let complited = (task.get(`days.${today}.complited`)) ? 0 : 1;
        task.set(`days.${today}.complitedAt`, moment().format('h:mm:ss'));
        task.set(`days.${today}.complited`, complited);
        this.sendAction('checkTask', task);
      },

      toggleUIInterface() {
        this.toggleProperty('tasksUI.mode');
      },

      toogleType(type) {
        let before = get(this, 'selectedType');

        //Checking if the same taskType was selected for toggling fun
        if (before !== type.name) {
          let prevType = this.get('taskTypes')
                            .find(types => types.name === before);
          set(prevType, 'toggle', !prevType);
        }

        ///Getting selected type
        let name = get(type, 'name');
        let toggle = get(type, 'toggle');

        //setting selected type and toggle property
        set(type, 'toggle', !toggle);
        set(this, 'selectedType', name);
      }
    }
});
