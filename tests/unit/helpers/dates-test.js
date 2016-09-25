import { showDates } from 'brain/helpers/show-dates';
import { module, test } from 'qunit';

module('Unit | Helper | dates');

// Replace this with your real tests.
test('Test for all days', function(assert) {
  let result = showDates([[1,1,1,1,1,1,1]]);
  assert.equal('All days', result);
});
//
test('Test for two days', function(assert) {
  let result = showDates([[1,1,0,0,0,0,0]]);
  assert.equal('Sun, Mon, ', result);
});

test('Test for four days', function(assert) {
  let result = showDates([[1,1,1,1,0,0,0]]);
  assert.equal('S, M, T, W, ', result);
});
