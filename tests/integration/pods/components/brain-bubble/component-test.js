import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('brain-bubble', 'Integration | Component | brain bubble', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{brain-bubble}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#brain-bubble}}
      template block text
    {{/brain-bubble}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
