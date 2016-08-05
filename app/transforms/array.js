import Transform from 'ember-data/transform';
import jQuery from 'jquery';
import Ember from 'ember';
export default Transform.extend({
  deserialize(serialized) {
    var type = Ember.typeOf(serialized);
    if (type === 'array') {
      return serialized;
    } else if (type === 'string') {
      return serialized.split(',').map(function (item) {
          return parseInt(jQuery.trim(item));
      });
    } else {
      return [];
    }
  },

  serialize(deserialized) {
    var type = Ember.typeOf(deserialized);
    if (type === 'array') {
        return deserialized;
    } else if (type === 'string') {
        return deserialized.split(',').map(function (item) {
            return jQuery.trim(item);
        });
    } else {
        return [];
    }
  }
});
