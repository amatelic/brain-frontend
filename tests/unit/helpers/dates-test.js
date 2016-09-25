import { showDates } from 'brain/helpers/show-dates';
import { module, test } from 'qunit';
import Ember from 'ember';

module('Unit | Helper | odd');

// Replace this with your real tests.
test('Test for all days', function(assert) {
  let result = showDates([1,1,1,1,1,1,1]);
  console.log(result)
  assert.equal('All day`s', result);
});
//
// test('Test for two days', function(assert) {
//   let result = showDates([1,1,0,0,0,0,0]);
//   assert.equal('Sun,Mon,1', result);
// });
