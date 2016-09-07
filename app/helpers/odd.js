import Ember from 'ember';

export function odd(params/*, hash*/) {
  console.log(params)
  return params;
}

export default Ember.Helper.helper(odd);
