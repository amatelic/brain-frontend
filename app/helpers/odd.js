import Ember from 'ember';
import Statistics from '../utility/statistics';
import moment from 'moment';
export function odd(params/*, hash*/) {
  let collection = params[0].toArray();
  if (Ember.isEmpty(collection)) return;
  let isSameMonth = parseInt(collection[0].get('month')) === (moment().month() + 1);
  let fromTodaysDay = moment().date() < params[1];
  if (params[1] === 0 || (isSameMonth && fromTodaysDay)) return;

  let complited = collection.reduce((a, b)=> {
    return (a += (b.get('monthly')[params[1] - 1] > 0) ? 1 : 0);
  }, 0);
  //`(${Statistics.procentage(complited, collection.length)}/100%)`
  let bla ='';
  let data = Statistics.procentage(complited, collection.length);
  if (data > 85) {
    return 'excellent';
  }else if(data > 60) {
    return 'success';
  }else if(data > 30) {
    return 'warning';
  } else {
    return 'danger';
  }
}

export default Ember.Helper.helper(odd);
