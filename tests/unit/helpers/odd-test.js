import { odd } from 'brain/helpers/odd';
import { module, test } from 'qunit';
import Ember from 'ember';
import moment from 'moment';

module('Unit | Helper | odd');

// Replace this with your real tests.
test('Array is empty', function(assert) {
  let collection = Ember.A();
  // let task = Ember.Object.extend({});
  let result = odd([collection]);
  assert.equal('none', result);
});


test('Array is danger', function(assert) {
  let collection = Ember.A();
  // let day = 32;
  let yesterday = moment().date() - 1;
  let arr = [];
  arr[yesterday] = {tracking: true, complited: 1};
  let task = Ember.Object.extend({
    month: moment().month(),
    days: arr
  });
  collection.addObject(task.create());
  let result = odd([collection, yesterday]);
  assert.equal('danger', result);
});
