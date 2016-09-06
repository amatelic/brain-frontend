import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  name: attr('underscore'),
  description: attr('string'),
  complited: attr('boolean', { defaultValue: false }),
  monthly: attr('array'),
  month: attr('string'),
  user: belongsTo('user'),
});
