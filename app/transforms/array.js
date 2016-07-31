import Transform from 'ember-data/transform';

export default Transform.extend({
  deserialize(serialized) {
    var type = Ember.typeOf(serialized);
    if (type == 'array') {
      return serialized;
    } else if (type === 'string') {
      return serialized.split(',').map(function (item) {
          return jQuery.trim(item);
      });
    } else {
      return [];
    }
    return (Ember.typeOf(serialized) == "array")
    ? serialized
    : [];
  },

  serialize(deserialized) {
    var type = Ember.typeOf(deserialized);
    if (type == 'array') {
        return deserialized;
    } else if (type == 'string') {
        return deserialized.split(',').map(function (item) {
            return jQuery.trim(item);
        });
    } else {
        return [];
    }
  }
});
