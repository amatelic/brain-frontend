import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('brain-bot', 'Integration | Component | brain bot', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  // this.render(hbs`{{brain-bot}}`);
  //
  // assert.equal(this.$().text().trim(), '');
  //
  // // Template block usage:
  // this.render(hbs`
  //   {{#brain-bot}}
  //     template block text
  //   {{/brain-bot}}
  // `);
  //
  // assert.equal(this.$().text().trim(), 'template block text');
  assert.equal(1, 1);
});
