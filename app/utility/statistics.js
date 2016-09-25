import Ember from 'ember';

export default Ember.Object.create({
  procentage(arg1, arg2) {
    return Math.round((arg1 * 100) / arg2);
  },

  differenc(data, callback, defNum) {
    var call = callback || this.isGreaterThanZero;
    defNum = defNum || 0;
    return data.reduce(call, defNum);
  },

  isGreaterThanZero(a, b) {
    return (a += (b > 0) ? 1 : 0);
  }
});
