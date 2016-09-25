import { complited } from 'brain/helpers/complited';
import { module, test } from 'qunit';
import Ember from 'ember';
module('Unit | Helper | complited');

// Replace this with your real tests.
test('All tasks are complited', function(assert) {
  // let tasks = Ember.Array.extend([]);
  let Task = Ember.Object.extend({complited: true});
  let tasks = Ember.A([]);
  tasks.addObject(Task.create());
  tasks.addObject(Task.create());
  let result = complited([tasks]);
  assert.equal('2/2', result);
});


test('One tasks is not complited', function(assert) {
  // let tasks = Ember.Array.extend([]);
  let Task = Ember.Object.extend({complited: true});
  let tasks = Ember.A([]);
  tasks.addObject(Task.create({complited: false}));
  tasks.addObject(Task.create());
  let result = complited([tasks]);
  assert.equal('1/2', result);
});
