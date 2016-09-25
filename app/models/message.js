import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo} from 'ember-data/relationships';

export default Model.extend({
  title: attr('string'),
  message: attr('string'),
  author: attr('string'),
  image: attr('string'),
  status: attr('boolean'),
  user: belongsTo('user', {async: true}),
});
