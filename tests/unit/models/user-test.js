import task from 'brain/models/task';
import message from 'brain/models/message';
import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user', 'Unit | Model | user', {
  // Specify the other units that are required for this test.
  needs: ['model:task', 'model:message']
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(model);
});

test('has all messsage properties', function(assert) {
  let user = this.subject({
    name: 'anze',
    username: 'matelic',
    image: 'http://localhost:5000/public/images/anze_matelic.jpg',
    plan: 'basic',
    auth: 'admin',
  });
  Ember.get(message, 'relationshipsByName');
  Ember.get(task, 'relationshipsByName');
  // let store = this.store();
  assert.equal(user.get('name'), 'anze');
  assert.equal(user.get('username'), 'matelic');
  assert.equal(user.get('image'), 'http://localhost:5000/public/images/anze_matelic.jpg');
  assert.equal(user.get('plan'), 'basic');
  assert.equal(user.get('auth'), 'admin');
});
