import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import moment from 'moment';
export default Model.extend({
  name: attr('underscore'),
  schedule: attr('array'),
  time: attr('number'),
  type: attr('string'),
  days: attr('array'),
  month: attr('string', { defaultValue: moment().month() }),
  year: attr('string', { defaultValue: moment().year() }),
  user: belongsTo('user', {async: true}),
});
