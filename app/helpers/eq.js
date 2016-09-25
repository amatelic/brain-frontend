import Ember from 'ember';
// import _ from 'loadash';
export function eq(params/*, hash*/) {
  return params[0] === params[1];
}

export default Ember.Helper.helper(eq);
