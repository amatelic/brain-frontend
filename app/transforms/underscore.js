import Transform from 'ember-data/transform';

export default Transform.extend({
  deserialize(serialized) {
    return serialized.replace('_', ' ');
  },

  serialize(deserialized) {
    return deserialized;
  }
});
