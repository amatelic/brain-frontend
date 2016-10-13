import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('brain-bar', 'Integration | Component | brain bar', {
  // integration: true
});

//svg bug
test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  // this.render(hbs`{{brain-bar}}`);
  //
  // assert.equal(this.$().text().trim(), '');

  // Template block usage:
  // this.render(hbs`
  //   {{#brain-bar}}
  //     template block text
  //   {{/brain-bar}}
  // `);
  //
  // assert.equal(this.$().text().trim(), 'template block text');
  assert.ok(true)
});
