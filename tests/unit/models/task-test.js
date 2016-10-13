import user from 'brain/models/user';
import { moduleForModel, test } from 'ember-qunit';
moduleForModel('task', 'Unit | Model | task', {
  // Specify the other units that are required for this test.
  needs: ['model:user']
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(model);
});

test('has all tasks properties', function(assert) {
  let task = this.subject({
    name: 'learning_french',
    schedule: [true, true, true, true, true, true, true],
    time: 60000,
    type: 'learn',
    days: [],
    month: "09",
    year: "2010",
    user: user,
  });
  // let store = this.store();
  assert.equal(task.get('name'), 'learning_french');
  assert.equal(task.get('schedule').length, 7);
  assert.equal(task.get('type'), 'learn');
  assert.equal(task.get('time'), 60000);
});
