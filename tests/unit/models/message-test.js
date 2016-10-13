import user from 'brain/models/user';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('message', 'Unit | Model | message', {
  // Specify the other units that are required for this test.
  needs: ['model:user']
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(model);
});

test('has all messsage properties', function(assert) {
  let message = this.subject({
    title: 'Muti message',
    message: 'This is just a basic test',
    author: 'Muti',
    image: 'https://guides.emberjs.com/',
    status: true,
    user: user,
  });
  // let store = this.store();
  assert.equal(message.get('title'), 'Muti message');
  assert.equal(message.get('message'), 'This is just a basic test');
  assert.equal(message.get('author'), 'Muti');
  assert.equal(message.get('image'), 'https://guides.emberjs.com/');
  assert.ok(message.get('status'));
});
