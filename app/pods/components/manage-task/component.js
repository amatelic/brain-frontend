import Ember from 'ember';
import moment from 'moment';
let {set, get} = Ember;
export default Ember.Component.extend({
    classNames: ['brain__card', 'brain__design'],
    isTypes: true,
    selectedType: 'learn',
    taskTypes: [
      { name: 'learn', toggle: true},
      { name: 'social', toggle: false},
      { name: 'creativity', toggle: false},
      { name: 'sport', toggle: false},
      { name: 'health', toggle: false}
    ],
    filterByTypes: Ember.computed('tasks', 'selectedType', function() {
      let type = this.get('selectedType');
      return this.get('tasks').filter(item => {
        return item.get('type') === type;
      });
    }),
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
        task.set(`days.${today}.complited`, complited);
        this.sendAction('checkTask', task);
      },
      toogleType(type) {
        let before = get(this, 'selectedType');
        if (before !== type.name) {
          let prevType = this.get('taskTypes').find(types => types.name === before);
          set(prevType, 'toggle', !prevType);
        }
        let name = get(type, 'name');
        let toggle = get(type, 'toggle');
          set(type, 'toggle', !toggle);
          set(this, 'selectedType', name);
      }
    }
});
