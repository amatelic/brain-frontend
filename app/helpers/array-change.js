import Ember from 'ember';

export function arrayChange(params/*, hash*/) {
  let days = params[0].filter(d => d.work === true);

  if (days.length === 7) {
    return 'All';
  }
  return days.map(d => d.name);
}

export default Ember.Helper.helper(arrayChange);
