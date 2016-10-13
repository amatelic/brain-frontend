import Ember from 'ember';
import Time from '../utility/timeformatter';

export function time(params/*, hash*/) {
  let format = params[1] || 'seconds';
  return Time.getTimefromSecs(params[0], format);
}

export default Ember.Helper.helper(time);
