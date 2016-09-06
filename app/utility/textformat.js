import Ember from 'ember';

export default Ember.Object.create({
  ration(arg1, arg2) {
    return `${arg1} / ${arg2}`;
  },
});
