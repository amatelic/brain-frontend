import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
moduleForComponent('calender-app', 'Integration | Component | calender app', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('tasks', Ember.Array());
  console.log(this.get('tasks'))
  this.render(hbs`{{calender-app}}`);

  assert.equal(this.$().text().trim(), '');
  let modal = [];
  // Template block usage:
  // this.render(hbs`
  //   {{#calender-app
  //     tasks=model
  //     getNextMonth="getNextMonth"
  //     showModal="showModal"
  //   {{/calender-app}}
  // `);
  // assert.equal(this.$().text().trim(), 'template block text');
});
