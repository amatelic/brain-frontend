import Ember from 'ember';

export function complited(params/*, hash*/) {
  let tasks = params[0];
  let complited = tasks.filter(task => task.get('complited') === true);
  return `${complited.length}/${tasks.get('length')}`;
}

export default Ember.Helper.helper(complited);
