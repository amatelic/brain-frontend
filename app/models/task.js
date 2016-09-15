import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  name: attr('underscore'),
  schedule: attr('array'),
  time: attr('number'),
  days: attr('array'),
  month: attr('string'),
  year: attr('string'),
  user: belongsTo('user', { async: true }),
});
