import Ember from 'ember';
// import _ from 'loadash';
export function eq(params/*, hash*/) {
  let size = params.length;
  if (size > 2) {
    return params[0] === params[1] ? params[2] : params[3];
  }
  return params[0] === params[1];
}

export default Ember.Helper.helper(eq);
