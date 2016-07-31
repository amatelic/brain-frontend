import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  description: attr('string'),
  complited: attr('boolean', { defaultValue: false }),
  monthly: attr('array'),
  user: belongsTo('user'),
});
