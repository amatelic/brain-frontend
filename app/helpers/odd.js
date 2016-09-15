import Ember from 'ember';
import Statistics from '../utility/statistics';
import moment from 'moment';
export function odd(params/*, hash*/) {
  let collection = params[0].toArray();
  if (Ember.isEmpty(collection)) return;
  let day = params[1];
  let today = moment().date();
  let fromTodaysDay = moment().date() < params[1];
  let isSameMonth = parseInt(collection[0].get('month')) === (moment().month());
  if (day === 0 || (isSameMonth && fromTodaysDay)) return;


  let data = collection.reduce((a, b) => {
      let date = b.get('days')[day - 1];
      if (!date) {
        return a;
      }
      a.all+= (date.tracking) ? 1 : 0;
      a.complited += (date.complited >= 1) ? 1 : 0;
      return a;
    },{
      all: 0,
      complited: 0
  });
  let procentage = Statistics.procentage(data.complited, data.all);

  if (procentage > 85) {
    return 'excellent';
  }else if(procentage > 60) {
    return 'success';
  }else if(procentage > 30) {
    return 'warning';
  } else {
    return 'danger';
  }
}

export default Ember.Helper.helper(odd);
