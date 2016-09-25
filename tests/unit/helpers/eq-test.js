import { eq } from 'brain/helpers/eq';
import { module, test } from 'qunit';

module('Unit | Helper | eq');

// Replace this with your real tests.
test('Check if values are not the same', function(assert) {
  let example2 = eq([1, 1]);
  let example1 = eq([2, 1]);
  assert.ok(example2);
  assert.notOk(example1);
});


test('Object don\'t return value.', function(assert) {
  let example2 = eq([{}, {}]);
  assert.notOk(example2);
});
