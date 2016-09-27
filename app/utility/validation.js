import Ember from 'ember';
export default Ember.Object.extend({
  notEmail(name) {
    return !(/(^$|^.*@.*\..*$)/.test(name));
  },
  isEmpty(name) {
    return name.length === 0;
  },
  greater(input, number) {
    return input.length < parseInt(number);
  },
  equal(input, comperator) {
    let compare = this.get(`${comperator}.value`);
    return compare !== input;
  },
  response: {
    notEmail: 'This is not an email',
    isEmpty: 'The field is empty',
    equal: (input, value) => `The values are not equal`,
    greater: (input, value) => `Value must be greate than ${value}`,
  }
});
