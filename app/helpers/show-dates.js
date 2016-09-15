import Ember from 'ember';

//Module for display dates of users when to work on task
//types are [All] - [M,T,W,S] - [Mon, Sat]
export function showDates(params/*, hash*/) {
  let length = params[0].filter(d => d).length;
  let dates = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  if (length === 7) {
    return 'All days';
  }
  return params[0].reduce((p, d, i) => {
    return (p+= (d) ? `${shortem(dates[i], length)}, ` : '');
  }, '');
}

function shortem(day, size) {
  return (size > 3) ? day.slice(0, 1): day;
}

export default Ember.Helper.helper(showDates);
